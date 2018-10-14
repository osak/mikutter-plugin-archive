import * as express from 'express';
import * as cors from 'cors';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

const app = express();
app.use(cors({ origin: true }));

app.get('/plugins/search', async (req, res) => {
    const text = req.query.q;
    const docs = await admin.firestore().collection('plugins').get();
    const data = docs.docs.filter(createPluginFilter(text));
    res.send(data.map((d) => d.data()));
});

function createPluginFilter(query: string) {
    const text = query.toLowerCase();
    return (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = doc.data();
        return data.name.toLowerCase().includes(text) || data.slug.toLowerCase().inclues(text);
    };
}

export const rest = functions.https.onRequest(app);