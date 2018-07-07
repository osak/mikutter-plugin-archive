import {connect} from "react-redux";
import {User} from "firebase";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import {Link} from "../../components/molecules/Link";

import './style.css';

interface Props {
    currentUser: User,
    onLogin: () => void
}

export const Navbar = connect((state: any) => ({
    currentUser: state.currentAccount.user
}))(class Navbar extends React.PureComponent<Props> {
    render() {
        const { currentUser } = this.props;
        return (
            <Toolbar>
                <Grid container justify="space-between" wrap="nowrap">
                    <Grid item container>
                        <Grid item><Link href="/" className="navbar-link" styles={{ text: 'title' }}>MPA</Link></Grid>
                        <Grid item><Link href="/upload" className="navbar-link" styles={{ text: 'body1' }}>Upload</Link></Grid>
                    </Grid>
                    <Grid item container justify="flex-end" alignItems="center">
                        {currentUser ? currentUser.displayName :
                            <Button color="inherit" onClick={this.props.onLogin}>Login</Button>}
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
});