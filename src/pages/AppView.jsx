import React from 'react';
import { withStyles } from '@mui/styles';
import {
    AppBar,
    Toolbar,
    Paper,
    Typography,
} from '@mui/material';
import Content from '../views/Content.jsx';

const styles = theme => ({
  offset: theme.mixins.toolbar,
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.title = 'React CodeBase x Webpack 5';
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

export default withStyles(styles)(App);
