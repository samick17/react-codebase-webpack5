import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './Root.jsx';
import Navigation from './models/Navigation.js';

// To prevent load twice
if(window.isLoaded) {
} else {
	const browserHistory = createBrowserHistory();
	Navigation.setHistory(browserHistory);
	let counter = 0;
	let rootRef = null;
	function init() {
		if(rootRef) {
			rootRef.update();
		} else {
			ReactDom.render(<Root
			browserHistory={browserHistory}
			ref={node=>rootRef=node}
		/>, document.getElementById('root'));
		}
	}
	const initHandler = () => init();
	window.addEventListener('load', initHandler);
	window.addEventListener('popstate', initHandler);
	window.addEventListener('custom:init', initHandler);
}
window.isLoaded = true;
