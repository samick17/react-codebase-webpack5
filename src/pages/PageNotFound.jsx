import React from 'react';
import {
    withStyles,
    Typography,
} from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
    },
    content: {
        margin: 'auto',
    },
});

class PageNotFound extends React.Component {

    render() {
        const {
            classes,
            error,
        } = this.props;
        return <div className={classes.wrapper}>
            <div className={classes.content}>
                <Typography variant='h5'>Page Not Found</Typography>
            </div>
        </div>
    }

}

export default withStyles(styles)(PageNotFound);
