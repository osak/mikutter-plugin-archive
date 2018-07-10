import Grid from "@material-ui/core/Grid";
import React from "react";
import {Plugin} from "../../models/plugin";

interface Props {
    plugin: Plugin;
}

export function PluginOverview(props: Props) {
    return (
        <Grid container direction="column">
            <Grid item>Name: {props.plugin.name}</Grid>
            <Grid item>Version: {props.plugin.version}</Grid>
            <Grid item>URL: {props.plugin.url}</Grid>
        </Grid>
    );
}