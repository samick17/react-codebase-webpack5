import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './Root.jsx';
import './index.module.css';

// To prevent load twice
if(window.isLoaded) {
} else {
	window.addEventListener('load', () => {
		const browserHistory = createBrowserHistory();
		ReactDom.render(<Root
			browserHistory={browserHistory}
		/>, document.getElementById('root'))
	});
}
window.isLoaded = true;
