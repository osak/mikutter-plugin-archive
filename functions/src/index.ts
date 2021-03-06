import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as tmp from 'tmp';
import {Plugin} from "../../src/models/plugin";
import * as jsyaml from 'js-yaml';
import AdmZip = require("adm-zip");
import {ObjectMetadata} from "../node_modules/firebase-functions/lib/providers/storage";
import gcsInit = require('@google-cloud/storage');
import * as semver from 'semver';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const parsePlugin = functions.storage.object().onFinalize(async (obj: ObjectMetadata, context) => {
    const tmpPath = tmp.dirSync().name;
    console.log(`Create tmpdir ${tmpPath}`);

    const fileName = path.join(tmpPath, 'a.zip');
    const fileRef = admin.storage().bucket('mikutter-plugin-archive.appspot.com').file(obj.name);
    await fileRef.download({
        destination: fileName
    });
    console.log(`Download ${obj.name} to ${fileName}`);

    const zipFile = new AdmZip(fileName);
    zipFile.extractAllTo(tmpPath);
    console.log(`Unzip ${fileName}`);

    const pluginDir = fs.readdirSync(tmpPath).find((name) => name !== 'a.zip');
    const specPath = path.join(tmpPath, pluginDir, '.mikutter.yml');
    if (!fs.existsSync(specPath)) {
        console.error(`${obj.name} is not a mikutter plugin. Delete.`);
        await fileRef.delete();
        return;
    }

    const uploadedUserUid = obj.name.match(/^(.*)\//)[1];
    const downloadLink = await generateDownloadLink(obj);
    const specContent = fs.readFileSync(specPath, 'utf8');
    const spec = jsyaml.safeLoad(specContent);
    const plugin: Plugin = {
        slug: spec['slug'],
        name: spec['name'],
        version: spec['version'],
        url: downloadLink,
        author: spec['author'],
        description: spec['description'],
        uploadedBy: {
            uid: uploadedUserUid,
            name: 'not available',
        }
    };
    console.log(`Spec parsed: ${JSON.stringify(plugin)}`);

    const currentPlugin = await findPlugin(plugin.slug);
    if (currentPlugin) {
        if (currentPlugin.uploadedBy.uid !== plugin.uploadedBy.uid) {
            console.error(`Plugin ${plugin.slug} is originally uploaded by ${currentPlugin.uploadedBy.uid}, but new version is by ${plugin.uploadedBy.uid}. Abort processing.`);
            return;
        }
        if (semver.lte(semver.coerce(plugin.version), semver.coerce(currentPlugin.version))) {
            console.error(`Version string of newly uploaded plugin ${plugin.slug} (${plugin.version}) is not newer than old one (${currentPlugin.version}). Abort processing.`);
            return;
        }
    }

    await admin.firestore().collection('plugins').doc(plugin.slug).set(plugin);
});

async function generateDownloadLink(obj: ObjectMetadata): Promise<string> {
    const gcs = gcsInit({
        keyFilename: 'service-account-credentials.json',
    });
    const bucket = gcs.bucket(obj.bucket);
    const file = bucket.file(obj.name);
    const links = await file.getSignedUrl({
            action: 'read',
            expires: '01-01-2100',
    });
    return links[0];
}

async function findPlugin(slug: string): Promise<Plugin | undefined> {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await admin.firestore().collection('plugins').doc(slug).get();
    if (snapshot.exists) {
        return (snapshot.data() as Plugin);
    }
    return undefined;
}

export {rest as api} from './rest';