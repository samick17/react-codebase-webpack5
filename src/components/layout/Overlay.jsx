import React from 'react';
import { withStyles } from '@mui/styles';

const styles = theme => ({
	wrapper: props => ({
		position: props.fit ? 'absolute' : 'fixed',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		display: 'flex',
		backgroundColor: props.backgroundColor || '',
	}),
});

class Overlay extends React.Component {

	render() {
		const {
			classes,
			children,
			onClick,
		} = this.props;
		return <div className={classes.wrapper} onClick={onClick}>
		{
			children
		}
		</div>
	}

}

export default withStyles(styles)(Overlay);
