import Grid from "@material-ui/core/Grid";
import React from "react";
import {Plugin} from "../../models/plugin";
import {Text} from "../atoms/Text";
import {Paper} from "@material-ui/core";

import './style.css';

interface Props {
    plugin: Plugin;
}

export function PluginOverview(props: Props) {
    return (
        <Paper className="plugin-overview">
            <Grid container direction="column" className="plugin-overview">
                <Grid item className="header">
                    <Grid container direction="row" alignItems="center">
                        <Grid item className="name"><Text style="headline">{props.plugin.name}</Text></Grid>
                        <Grid item className="version"><Text>{props.plugin.version}</Text></Grid>
                    </Grid>
                </Grid>
                <Grid item>URL: {props.plugin.url}</Grid>
            </Grid>
        </Paper>
    );
}