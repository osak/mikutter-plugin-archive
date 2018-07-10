import firebase from "firebase";
import {Dispatch} from "redux";
import {action, payload, union} from "ts-action";
import {Plugin} from "../../../models/plugin";
import {MPAAction, MPAState} from "../../../reducers";

export const UploadPluginStart = action('upload-page/upload-start', payload<File>());
export const UploadPluginCompleted = action('upload-page/upload-completed', payload<File>());
export const UploadPluginFailed = action('upload-page/upload-failed', payload<File>());
export const PluginParseCompleted = action('upload-page/plugin-parse-completed', payload<Plugin>());

const UploadPageActions = union({
    UploadPluginStart,
    UploadPluginCompleted,
    UploadPluginFailed,
    PluginParseCompleted
});
export type UploadPageAction = typeof UploadPageActions;

export function uploadPlugin(file: File) {
    return (dispatch: Dispatch, getState: () => MPAState) => {
        dispatch(new UploadPluginStart(file));

        const state = getState();
        const currentUser = state.currentAccount.user;
        if (currentUser == undefined) {
            throw new Error('Precondition failure: User must be logged in');
        }
        const filePath = `${currentUser.uid}/${file.name}`;
        firebase.storage().ref(filePath).put(file)
            .then((snapshot) => {
                console.log(snapshot.metadata.name);
                firebase.firestore().collection('plugins').doc(snapshot.metadata.name).onSnapshot((pluginDoc) => {
                    console.log('exists?', pluginDoc.exists);
                    if (pluginDoc.data() != undefined) {
                        dispatch(new PluginParseCompleted(pluginDoc.data() as Plugin));
                    }
                });
                dispatch(new UploadPluginCompleted(file));
            })
            .catch((reason) => {
                console.error(reason);
                dispatch(new UploadPluginFailed(file));
            });
    };
}

export enum ResourceState {
    LOADING = 'loading',
    VALID = 'valid',
    FAILED = 'failed',
    EMPTY = 'empty',
    PARSING = 'parsing',
}

export interface UploadPageState {
    plugin?: Plugin;
    pluginState: ResourceState;
}

const INITIAL_STATE: UploadPageState = {
    plugin: undefined,
    pluginState: ResourceState.EMPTY
};

export function reducer(state: UploadPageState = INITIAL_STATE, action: MPAAction): UploadPageState {
    switch(action.type) {
        case UploadPluginStart.type:
            return {
                ...state,
                plugin: undefined,
                pluginState: ResourceState.LOADING
            };
        case UploadPluginCompleted.type:
            return {
                ...state,
                pluginState: ResourceState.PARSING,
            };
        case UploadPluginFailed.type:
            return {
                ...state,
                plugin: undefined,
                pluginState: ResourceState.FAILED
            };
        case PluginParseCompleted.type:
            return {
                ...state,
                plugin: action.payload,
                pluginState: ResourceState.VALID,
            };
        default:
            return state;
    }
}
