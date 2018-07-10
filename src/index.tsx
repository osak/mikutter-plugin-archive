import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {RootComponentProps, startRouting} from "./routes";
import {store} from "./store";
import {Provider} from "react-redux";
import {Main} from "./containers/common/Main";

function initFirebase() {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyDpeST77o0Wo0iS6ZfYWajNAgMkQeVat98",
        authDomain: "mikutter-plugin-archive.firebaseapp.com",
        databaseURL: "https://mikutter-plugin-archive.firebaseio.com",
        projectId: "mikutter-plugin-archive",
        storageBucket: "mikutter-plugin-archive.appspot.com",
        messagingSenderId: "1045335220920",
    };
    firebase.initializeApp(config);
    firebase.firestore().settings({
        timestampsInSnapshots: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    startRouting((props: RootComponentProps) => (
        <Provider store={store}>
            <Main>{props.children}</Main>
        </Provider>
    ));
});