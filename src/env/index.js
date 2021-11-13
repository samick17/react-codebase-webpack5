export default {
	isProd: () => {
		return process.env.NODE_ENV === 'production';
	},
	isDev: () => {
		return process.env.NODE_ENV === 'development';
	},
};
