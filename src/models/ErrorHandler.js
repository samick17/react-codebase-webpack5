import Env from '../env/index.js';

function logError(err) {
	if(!err) return;
	if(!Env.isLocal) return;
	if(err.code) {
		console.log('[Error]', err.code, err.message);
	} else {
		console.log('[Error]', err.message);
	}
}
function isNetworkError(err) {
	return err.message === 'Network Error';
}

export default {
	handle: (err) => {
		if(err) {
			if(err.isAxiosError) {
				if(isNetworkError(err)) {
					logError(err);
				} else {
					switch(err.response.status) {
						case 401:
						break;
						default:
						logError(err);
						break;
					}
				}
			} else {
				logError(err);
			}
		} else {
			// do nothing
		}
	},
};
