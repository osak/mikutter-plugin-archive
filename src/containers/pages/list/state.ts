import firebase from "firebase";
import {Dispatch} from "redux";
import {action, on, payload, reducer, union} from "ts-action";
import {Plugin} from "../../../models/plugin";

const LoadStart = action('list-page/load-start');
const LoadCompleted = action('list-page/load-completed', payload<Plugin[]>());
const LoadFailed = action('list-page/load-failed');

const ListPageActions = union({
    LoadStart,
    LoadCompleted,
    LoadFailed,
});

export type ListPageAction = typeof ListPageActions;

export function loadPlugins() {
    return async (dispatch: Dispatch) => {
        dispatch(new LoadStart());
        try {
            const result = await firebase.firestore().collection('plugins').limit(10).get();
            const plugins = result.docs.map(Plugin.parseDoc);
            dispatch(new LoadCompleted(plugins));
        } catch (error) {
            dispatch(new LoadFailed());
        }
    };
}


export interface ListPageState {
    plugins: Plugin[];
}

export const mainReducer = reducer<ListPageState>([
    on(LoadCompleted, (state, action) => ({
        ...state,
        plugins: action.payload
    }))
], {
    plugins: []
});
