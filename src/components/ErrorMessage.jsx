import React from 'react';
import { withStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import FlexContainer from './FlexContainer.jsx';

const styles = theme => ({
	block: {
		marginTop: '2vmin',
	},
	errMsg: {
		margin: 'auto',
		color: '#FF688C',
		fontWeight: 'bold',
	},
});

class ErrorMessage extends React.Component {

	render() {
		const {
			classes,
			message,
		} = this.props;
		return <div className={classes.block}>
			<FlexContainer>
			<Typography className={classes.errMsg}>{message}</Typography>
			</FlexContainer>
		</div>
	}

}

export default withStyles(styles)(ErrorMessage);
