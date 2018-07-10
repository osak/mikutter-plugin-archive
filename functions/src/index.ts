import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {Plugin} from "../../src/models/plugin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const parsePlugin = functions.storage.object().onFinalize(async (obj, context) => {
    const plugin: Plugin = {
        name: 'Test plugin',
        version: 'v25.2.5',
        url: 'coming soon',
    };
    const parts = obj.name.split('/');
    const name = parts[parts.length - 1];
    console.log(obj.name, name);
    await admin.firestore().collection('plugins').doc(name).create(plugin);
});