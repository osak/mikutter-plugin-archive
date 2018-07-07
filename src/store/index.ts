import {applyMiddleware, combineReducers, createStore} from "redux";
import { createLogger } from 'redux-logger';
import {reducers} from "../reducers";

const logger = createLogger({});
export const store = createStore(combineReducers(reducers), applyMiddleware(logger));