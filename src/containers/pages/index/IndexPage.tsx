import * as React from 'react';
import {Page} from "../../../components/atoms/Page";
import {Jumbotron, JumbotronClasses} from "../../../components/molecules/Jumbotron";
import './style.css';

export function IndexPage() {
    const jumbotronClasses: JumbotronClasses = {
        paper: 'index-jumbotron',
    };

    return (
        <Page>
            <Jumbotron title="Mikutter Plugin Archive" classes={jumbotronClasses}>Welcome to Teokure...</Jumbotron>
        </Page>
    );
}