import React from 'react';
import { withStyles } from '@mui/styles';
import Loading from '../components/Loading.jsx';

const styles = theme => ({
});

class LoadingPage extends React.Component {

    render() {
        return <Loading/>
    }

}

export default withStyles(styles)(LoadingPage);
