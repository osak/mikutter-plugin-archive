import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import {Navbar} from "./Navbar";
import Grid from "@material-ui/core/Grid";
import {User} from "firebase";
import React from "react";
import firebase from "firebase";
import {Logout} from "../../reducers/currentAccount";
import {Login} from "../../reducers/currentAccount";
import {Dispatch} from "redux";

interface Props {
    currentUser?: User;
    dispatch: Dispatch<any>;
    children: any;
}

export const Main = connect()(
    class Main extends React.PureComponent<Props> {
        componentDidMount() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.props.dispatch(new Login(user));
                } else {
                    this.props.dispatch(new Logout());
                }
            });
        }

        async login() {
            const provider = new firebase.auth.GithubAuthProvider();
            try {
                await firebase.auth().signInWithPopup(provider);
            } catch (e) {
                console.error(e);
            }
        }

        render() {
            return (
                <>
                    <CssBaseline/>
                    <AppBar position="static">
                        <Navbar onLogin={this.login.bind(this)} />
                    </AppBar>
                    <Grid container className="page-content" direction="column">
                        {this.props.children}
                    </Grid>
                </>
            );
        }
    });
