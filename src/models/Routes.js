const Entries = [
	{
		path: '/',
		componentKey: 'index',
		exact: true
	},
	{
		path: '/index',
		componentKey: 'index',
		exact: true
	},
	{
		path: '/index.html',
		componentKey: 'index',
		exact: true
	},
	{
		path: '/404',
		componentKey: 'page_not_found',
		exact: true
	},
	{
		path: '/404.html',
		componentKey: 'page_not_found',
		exact: true
	},
	{
		path: '/error',
		componentKey: 'error',
		exact: true
	},
	{
		path: '/loading',
		componentKey: 'loading',
		exact: true
	},
	{
		path: '*',
		componentKey: 'fallback',
		exact: true
	}
];

const Loaders = {
	index: () => import('../pages/AppView.jsx'),
	error: () => import('../pages/ErrorView.jsx'),
	loading: () => import('../pages/Loading.jsx'),
	page_not_found: () => import('../pages/PageNotFound.jsx'),
	fallback: () => import('../pages/PageNotFound.jsx'),
};

export default {
    Entries,
    Loaders,
};
