import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ErrorView from './pages/ErrorView.jsx';
import AppRouter from './AppRouter.jsx';
import theme from './theme.js';
import Routes from './models/Routes.js';

class Root extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
        hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.error = error;
    this.errorInfo = errorInfo;
    this.forceUpdate();
  }

  renderErrorView() {
    const {
        error,
      } = this;
    return <ErrorView error={error}/>
  }

  renderView() {
    return <AppRouter
      history={this.props.browserHistory}
      entries={Routes.Entries}
      loaders={Routes.Loaders}
    />;
  }

  render () {
    return <ThemeProvider theme={theme}>
    {
      this.state.hasError ?
      this.renderErrorView() :
      this.renderView()
    }
    </ThemeProvider>;
  }

}

export default Root;
