import { loadLib } from '../models/Utils.js';
import Config from '../Config.js';

export default {
	load: async () => {
		await loadLib('https://apis.google.com/js/api:client.js', 'google-api-client');
		let gapi = window.gapi;
		return new Promise(resolve => {
			gapi.load('auth2', function() {
				// Retrieve the singleton for the GoogleAuth library and set up the client.
				let auth2 = gapi.auth2.init({
					client_id: Config.google_client_id,
					cookiepolicy: 'single_host_origin',
					// Request scopes in addition to 'profile' and 'email'
					//scope: 'additional_scope'
				});
				resolve(auth2);
				// attachSignin(document.getElementById('customBtn'));
		    });
		});
	},
	signin: () => {

	},
};
