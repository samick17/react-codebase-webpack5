import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './Root.jsx';

const browserHistory = createBrowserHistory();

ReactDom.render(<Root
	browserHistory={browserHistory}
/>, document.getElementById('root'))
