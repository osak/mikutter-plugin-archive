import {connect} from "react-redux";
import {Plugin} from "../../../models/plugin";
import {ResourceState} from "./state";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MPAState} from "../../../reducers";

interface Props {
    plugin?: Plugin;
    pluginState: ResourceState;
}

export const PluginInfo = connect((state: MPAState) => ({
    ...state.uploadPage
}))(function PluginInfo(props: Props) {
    if (!props.plugin) {
        if (props.pluginState === ResourceState.LOADING || props.pluginState == ResourceState.PARSING) {
            return (
                <Grid container>
                    <Grid item>Parsing...</Grid>
                    <Grid item><CircularProgress/></Grid>
                </Grid>
            );
        } else {
            return <p>(unimplemented state)</p>;
        }
    }
    return (
        <Grid container direction="column">
            <Grid item>Name: {props.plugin.name}</Grid>
            <Grid item>Version: {props.plugin.version}</Grid>
            <Grid item>URL: {props.plugin.url}</Grid>
        </Grid>
    );
});
