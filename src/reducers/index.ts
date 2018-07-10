import {mainReducer as listPage, ListPageState, ListPageAction} from "../containers/pages/list/state";
import {CurrentAccountAction, CurrentAccountState, reducer as currentAccount} from './currentAccount';
import {reducer as uploadPage, UploadPageAction, UploadPageState} from '../containers/pages/upload/state';

export interface MPAState {
    currentAccount: CurrentAccountState;
    uploadPage: UploadPageState;
    listPage: ListPageState;
}

export type MPAAction = CurrentAccountAction | UploadPageAction | ListPageAction;

export const reducers = {
    currentAccount,
    uploadPage,
    listPage,
};