import * as express from 'express';
import * as cors from 'cors';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

const app = express();
app.use(cors({ origin: true }));

app.get('/plugins/search', async (req, res) => {
    const docs = await admin.firestore().collection('plugins').limit(10).get();
    const data = docs.docs.map((doc) => doc.data());
    res.send(data);
});

export const rest = functions.https.onRequest(app);