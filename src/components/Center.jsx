import React from 'react';
import { withStyles } from '@mui/styles';

const styles = theme => ({
	wrapper: {
		margin: 'auto',
	},
});

class Center extends React.Component {

	render() {
		const {
			classes,
			children,
		} = this.props;
		return <div className={classes.wrapper}>
		{
			children
		}
		</div>
	}

}

export default withStyles(styles)(Center);
