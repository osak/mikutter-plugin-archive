import firebase from "firebase";
import {MpaUser} from "./mpaUser";

export interface Plugin {
    slug: string;
    name: string;
    version: string;
    url: string;
    author: string;
    description: string;
    uploadedBy: MpaUser;
}

export namespace Plugin {
    import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

    export function parseDoc(doc: QueryDocumentSnapshot): Plugin {
        const data = doc.data();
        return {
            slug: data.slug,
            name: data.name,
            version: data.version,
            url: data.url,
            author: data.author,
            description: data.description,
            uploadedBy: data.uploadedBy,
        };
    }
}
