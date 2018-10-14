import { Plugin } from '../models/plugin';
import * as firebase from "firebase";

export async function findBySlug(slug: string): Promise<Plugin> {
    const doc = await firebase.firestore().collection('plugins').doc(slug).get();
    if (doc == undefined) {
        throw new Error('Cannot load plugin ' + slug);
    }
    return (doc.data() as Plugin);
}
