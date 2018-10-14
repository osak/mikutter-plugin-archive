import Grid from "@material-ui/core/Grid";
import React from "react";
import {Plugin} from "../../models/plugin";
import {Text} from "../atoms/Text";
import {Paper} from "@material-ui/core";

import './style.css';
import {Link} from "./Link";

interface Props {
    plugin: Plugin;
}

export function PluginOverview(props: Props) {
    return (
        <Paper className="plugin-overview">
            <Grid container direction="column" className="plugin-overview">
                <Grid item className="header">
                    <Grid container direction="row" alignItems="center">
                        <Grid item className="name"><Text style="headline"><Link href={`/plugin/${props.plugin.slug}`}>{props.plugin.name}</Link></Text></Grid>
                        <Grid item className="version"><Text>{props.plugin.version}</Text></Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item><Text>{props.plugin.author}</Text></Grid>
                    </Grid>
                </Grid>
                <Grid item className="description"><Text>{props.plugin.description}</Text></Grid>
                <Grid item><a href={props.plugin.url}>Download</a></Grid>
            </Grid>
        </Paper>
    );
}