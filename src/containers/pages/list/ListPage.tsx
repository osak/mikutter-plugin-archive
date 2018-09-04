import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {PluginOverview} from "../../../components/molecules/PluginOverview";
import {Plugin} from "../../../models/plugin";
import {TextField} from "@material-ui/core";
import {observer} from 'mobx-react';
import {action, observable} from "mobx";
import * as firebase from "firebase";

@observer
export class ListPage extends React.Component {
    @observable private plugins: Plugin[] = [];

    @action
    private async loadPlugins() {
        const result = await firebase.firestore().collection('plugins').limit(10).get();
        this.plugins = result.docs.map(Plugin.parseDoc);
    }

    componentDidMount() {
        this.loadPlugins();
    }

    render() {
        return (
            <Grid container direction="column">
                <Grid item><TextField label="Search"/></Grid>
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
