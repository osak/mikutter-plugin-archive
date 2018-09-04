import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React, {SyntheticEvent} from "react";
import {PluginOverview} from "../../../components/molecules/PluginOverview";
import {Plugin} from "../../../models/plugin";
import {TextField} from "@material-ui/core";
import {observer} from 'mobx-react';
import {action, flow, observable} from "mobx";
import * as firebase from "firebase";
import {get} from "../../../api/Api";

@observer
export class ListPage extends React.Component {
    @observable private searchText: string = '';
    @observable private plugins: Plugin[] = [];

    @action
    private async loadPlugins() {
        const result = await firebase.firestore().collection('plugins').limit(10).get();
        this.plugins = result.docs.map(Plugin.parseDoc);
    }

    search = flow(function*(this: ListPage) {
        this.plugins = yield get('/plugins/search', {q: this.searchText});
    }).bind(this);

    private async onSubmitForm(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        this.search();
    }

    @action
    private onSearchTextChange(e: SyntheticEvent<HTMLInputElement>) {
        this.searchText = e.currentTarget.value;
    }

    componentDidMount() {
        this.loadPlugins();
    }

    render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <form onSubmit={this.onSubmitForm.bind(this)}>
                        <TextField label="Search" value={this.searchText}
                                   onChange={this.onSearchTextChange.bind(this)}/>
                    </form>
                </Grid>
                <Grid item>
                    <List>
                        {this.plugins.map((plugin, i) => <ListItem key={i}>
                            <PluginOverview plugin={plugin}/>
                        </ListItem>)}
                    </List>
                </Grid>
            </Grid>
        );
    }
}
