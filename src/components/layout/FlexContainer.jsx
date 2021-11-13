import React from 'react';
import { withStyles } from '@mui/styles';
import cx from 'classnames';

const styles = theme => ({
	wrapper: props => ({
		position: 'relative',
		display: 'flex',
		float: props.right ? 'right' : undefined,
		width: props.fitParent ? '100%' : undefined,
		height: props.fitParent ? '100%' : undefined,
	}),
});

class FlexContainer extends React.Component {

	render() {
		const {
			className,
			classes,
		} = this.props;
		return <div className={cx(classes.wrapper, className)}>
		{
			this.props.children
		}
		</div>
	}

}

export default withStyles(styles)(FlexContainer);
