import firebase from "firebase";
import {MpaUser} from "./mpaUser";

export interface Plugin {
    name: string;
    version: string;
    url: string;
    author: string;
    uploadedBy: MpaUser;
}

export namespace Plugin {
    import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

    export function parseDoc(doc: QueryDocumentSnapshot): Plugin {
        const data = doc.data();
        return {
            name: data.name,
            version: data.version,
            url: data.url,
            author: data.author,
            uploadedBy: data.uploadedBy,
        };
    }
}
