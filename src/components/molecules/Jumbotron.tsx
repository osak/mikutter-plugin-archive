import * as React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export interface JumbotronClasses {
    paper?: string;
}

export interface Props {
    title: string;
    classes?: JumbotronClasses;
    children?: any;
}

export function Jumbotron(props: Props) {
    const classes = props.classes || {};

    return (
        <Grid container justify="center">
            <Grid item md={8}>
                <Paper className={classes.paper}>
                    <Typography variant="display4">{props.title}</Typography>
                    {props.children}
                </Paper>
            </Grid>
        </Grid>
    );
}