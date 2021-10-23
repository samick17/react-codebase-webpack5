import React from 'react';
import { withStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';

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

class ErrorView extends React.Component {

    onReloadClick = () => {
        window.location.reload();
    }

    render() {
        const {
            classes,
            error,
        } = this.props;
        return error ? <div className={classes.wrapper}>
            <div className={classes.content}>
                <div>
                    <Typography variant='h5'>Oops, something went wrong:</Typography>
                    <Typography variant='body1'>{error?.message}</Typography>
                </div>
                <Button fullWidth variant='outlined' onClick={this.onReloadClick}>Reload the page</Button>
            </div>
        </div> : <React.Fragment/>
    }

}

export default withStyles(styles)(ErrorView);
