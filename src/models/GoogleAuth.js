import { loadLib } from '../models/Utils.js';
import Config from '../Config.js';

export default {
	load: async () => {
		await loadLib('https://apis.google.com/js/api:client.js', 'google-api-client');
		let gapi = window.gapi;
		return new Promise(resolve => {
			gapi.load('auth2', async function() {
				await gapi.client.init({
					...Config.google,
				});
				resolve(gapi);
		    });
		});
	},
	signin: () => {

	},
};
