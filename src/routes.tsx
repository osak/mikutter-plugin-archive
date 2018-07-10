import UniversalRouter, {Route} from 'universal-router';
import {IndexPage} from "./containers/pages/index/IndexPage";
import {Action, Location} from "history";
import ReactDOM from 'react-dom';
import {ListPage} from "./containers/pages/list/ListPage";
import {UploadPage} from "./containers/pages/upload/UploadPage";
import React from 'react';
import {history} from './history';

export interface RootComponentProps {
    children: any;
}

const routes: Route[] = [
    {
        path: '/',
        action: () => <IndexPage/>
    },
    {
        path: '/upload',
        action: () => <UploadPage/>
    },
    {
        path: '/search',
        action: () => <ListPage/>
    },
];

const router = new UniversalRouter(routes);

async function onLocationChange(location: Location, _: Action, RootComponent: React.ComponentClass<RootComponentProps> | React.SFC<RootComponentProps>) {
    const result = await router.resolve(location);
    const rootElement = document.getElementById('main');
    console.log(location.pathname, result);
    ReactDOM.render(<RootComponent>{result}</RootComponent>, rootElement);
}

export function startRouting(RootComponent: React.ComponentClass<RootComponentProps> | React.SFC<RootComponentProps>) {
    history.listen((location, action) => onLocationChange(location, action, RootComponent));
    onLocationChange(history.location, 'PUSH', RootComponent);
}
