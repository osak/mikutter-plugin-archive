import {spawn} from "child_process";
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as tmp from 'tmp';
import {Plugin} from "../../src/models/plugin";
import * as jsyaml from 'js-yaml';
import AdmZip = require("adm-zip");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const parsePlugin = functions.storage.object().onFinalize(async (obj, context) => {
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

    const pluginDir = fs.readdirSync(tmpPath).find((name) => name != 'a.zip');
    const specPath = path.join(tmpPath, pluginDir, '.mikutter.yml');
    if (!fs.existsSync(specPath)) {
        console.error(`${obj.name} is not a mikutter plugin. Delete.`);
        await fileRef.delete();
        return;
    }

    const specContent = fs.readFileSync(specPath, 'utf8');
    const spec = jsyaml.safeLoad(specContent);
    const plugin: Plugin = {
        name: spec['name'],
        version: spec['version'],
        url: 'tbd'
    };
    console.log(`Spec parsed: ${JSON.stringify(plugin)}`);
    await admin.firestore().collection('plugins').doc(plugin.name).create(plugin);
});

export {rest as api} from './rest';