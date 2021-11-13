import React from 'react';
import { withStyles } from '@mui/styles';

const styles = theme => ({
	wrapper: {
	},
});

class Template extends React.Component {

	render() {
		const {
			classes,
		} = this.props;
		return <div className={classes.wrapper}>
		</div>
	}

}

export default withStyles(styles)(Template);
