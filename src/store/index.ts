import {applyMiddleware, combineReducers, createStore} from "redux";
import { createLogger } from 'redux-logger';
import {MPAAction, MPAState, reducers} from "../reducers";
import thunk from "redux-thunk";

const logger = createLogger({});
export const store = createStore(combineReducers<MPAState, MPAAction>(reducers), applyMiddleware(logger, thunk));