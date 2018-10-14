import {observer} from "mobx-react";
import * as React from "react";
import {Grid, Paper} from "@material-ui/core";
import {flow, observable} from "mobx";
import * as Loadable from "../../../dao/loadable";
import {Text} from "../../../components/atoms/Text";
import * as PluginDao from '../../../dao/plugin';

interface Props {
    slug: string;
}

@observer
export class PluginPage extends React.PureComponent<Props> {
    @observable private pluginLoadable: Loadable.Loadable<Plugin> = Loadable.empty();

    componentDidMount() {
        this.loadPlugin();
    }

    loadPlugin = flow(function*(this: PluginPage) {
        this.pluginLoadable = Loadable.startLoading(this.pluginLoadable);
        this.pluginLoadable = yield Loadable.fromPromise(PluginDao.findBySlug(this.props.slug));
    });

    render() {
        const plugin = this.pluginLoadable.value;
        if (!plugin) {
            return <Text>Loading</Text>;
        }

        return (
            <Paper>
                <Grid container>
                    <Text style="headline">{plugin.name}</Text>
                </Grid>
            </Paper>
        );
    }
}
