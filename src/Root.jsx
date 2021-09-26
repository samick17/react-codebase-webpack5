import React from 'react';
import {
    withStyles,
    AppBar,
    Toolbar,
    Paper,
    Typography,
} from '@material-ui/core';
import Content from './Content.jsx';

const styles = theme => ({
  offset: theme.mixins.toolbar,
});

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.title = 'Codebase x WebPack 5';
    }

    render() {
        const {
            classes,
        } = this.props;
        const {
            title,
        } = this;
        return <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography>{title}</Typography>
                </Toolbar>
            </AppBar>
            <Content/>
        </div>
    }

}

export default withStyles(styles)(Root);
