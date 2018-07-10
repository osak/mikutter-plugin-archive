import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {PluginOverview} from "../../../components/molecules/PluginOverview";
import {Plugin} from "../../../models/plugin";
import {MPAState} from "../../../reducers";
import {ListPageAction, loadPlugins} from "./state";

interface Props {
    plugins: Plugin[];
    dispatch: ThunkDispatch<MPAState, void, ListPageAction>;
}

export const ListPage = connect((state: MPAState) => ({
    ...state.listPage
}))(class ListPage extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.dispatch(loadPlugins());
    }

    render() {
        return (
            <Grid container>
                <List>
                    {this.props.plugins.map((plugin, i) => <ListItem key={i}>
                        <PluginOverview plugin={plugin}/>
                    </ListItem>)}
                </List>
            </Grid>
        );
    }
});