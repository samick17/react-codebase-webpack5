import React from 'react';
import { withStyles } from '@mui/styles';
import {
    Typography,
    CircularProgress,
} from '@mui/material';

const styles = theme => ({
    wrapper: {
        position: 'absolute',
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

class Loading extends React.Component {

    render() {
        const {
            classes,
            error,
        } = this.props;
        return <div className={classes.wrapper}>
            <div className={classes.content}>
            	<CircularProgress/>
                <Typography variant='h5'>Loading</Typography>
            </div>
        </div>
    }

}

export default withStyles(styles)(Loading);
