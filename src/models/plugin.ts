import firebase from "firebase";

export interface Plugin {
    name: string;
    version: string;
    url: string;
}

export namespace Plugin {
    import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

    export function parseDoc(doc: QueryDocumentSnapshot): Plugin {
        const data = doc.data();
        return {
            name: data.name,
            version: data.version,
            url: data.url,
        };
    }
}
