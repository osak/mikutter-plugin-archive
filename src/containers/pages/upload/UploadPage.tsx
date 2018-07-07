import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

interface Props {
}

export class UploadPage extends React.Component<Props> {
    fileInput?: HTMLInputElement;

    submit() {
        if (!this.fileInput) {
            throw new Error('Precondition failure: Reference to file selector is not captured');
        }

        const files = this.fileInput.files;
        if (!files || files.length === 0) {
            return;
        }

        console.log(files[0]);
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={10}>
                    <input id="file" type="file" accept="application/zip, application/gzip, application/bz2" ref={(ref) => this.fileInput = ref || undefined}/>
                    <Button variant="contained" color="primary" onClick={this.submit.bind(this)}>Upload</Button>
                </Grid>
            </Grid>
        );
    }
}