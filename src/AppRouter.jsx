import React, { Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loading from './pages/Loading.jsx';

class AppRouter extends React.Component {

	render() {
		return (<React.Fragment>
			<Suspense fallback={<Loading/>}>
				<Router history={this.props.history}>
					<Switch>
					{
						this.props.entries.map((route, index) => {
							const {
								exact,
								path,
								componentKey
							} = route;
							return <Route
								key={index}
								exact={exact}
								path={path}
								component={lazy(this.props.loaders[componentKey])}
							/>;
						})
					}
					</Switch>
				</Router>
			</Suspense>
		</React.Fragment>);
	}
}

export default AppRouter;
