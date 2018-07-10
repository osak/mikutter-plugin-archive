import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {PluginInfo} from "./PluginInfo";

import './style.css';
import {UploadPageAction, uploadPlugin} from "./state";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {MPAState} from "../../../reducers";

interface Props {
    dispatch: ThunkDispatch<MPAState, void, UploadPageAction>;
}

export const UploadPage = connect()(class UploadPage extends React.Component<Props> {
    fileInput?: HTMLInputElement;

    submit() {
        if (!this.fileInput) {
            throw new Error('Precondition failure: Reference to file selector is not captured');
        }

        const files = this.fileInput.files;
        if (!files || files.length === 0) {
            return;
        }

        this.props.dispatch(uploadPlugin(files[0]));
    }

    render() {
        return (
            <Grid container className="upload-page" direction="column">
                <Grid item xs={10}>
                    <input id="file" type="file" accept="application/zip, application/gzip, application/bz2"
                           ref={(ref) => this.fileInput = ref || undefined}/>
                    <Button variant="contained" color="primary" onClick={this.submit.bind(this)}>Upload</Button>
                </Grid>
                <Grid item xs={10}>
                    <Paper>
                        <PluginInfo />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
});