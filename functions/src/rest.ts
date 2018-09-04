import * as express from 'express';
import * as cors from 'cors';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as _ from 'lodash';

const app = express();
app.use(cors({ origin: true }));

app.get('/plugins/search', async (req, res) => {
    const text = req.query.q;
    const docs = await admin.firestore().collection('plugins').get();
    const data = docs.docs.filter((doc) => doc.data().name.toLowerCase().includes(text.toLowerCase()));
    res.send(_.take(data, 10).map((d) => d.data()));
});

export const rest = functions.https.onRequest(app);