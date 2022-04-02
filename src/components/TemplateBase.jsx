import React from 'react';
import { withStyles } from '@mui/styles';
import { BaseComponent } from 'react-event-base/Components';

const styles = theme => ({
	wrapper: {
	},
});

class Template extends BaseComponent {

	render() {
		const {
			classes,
		} = this.props;
		return <div className={classes.wrapper}>
		</div>
	}

}

export default withStyles(styles)(Template);
