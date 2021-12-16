import axios from 'axios';

class API {
	constructor() {
		this.client = axios.create({
			baseURL: (() => {
				if(window.location.origin === 'http://localhost:4200') {
					return 'http://localhost:8000';
				} else if(window.location.origin === 'http://localhost:8000') {
					return 'http://localhost:8000';
				} else {
					return '';
				}
			})(),
			withCredentials: true,
		});
	}
	session() {
		return this.client({
			method: 'get',
			url: '/api/v1/account/me',
		});
	}
	signIn(data) {
		return this.client({
			method: 'post',
			url: '/api/v1/account/signin',
			data: data,
		});
	}
	signUp(data) {
		return this.client({
			method: 'post',
			url: '/api/v1/account/signup',
			data: data,
		});
	}
	signInPortal(data) {
		return this.client({
			method: 'post',
			url: '/api/v1/account/signin_portal',
			data: data,
		});
	}
	signOut() {
		this.client({
			method: 'post',
			url: '/api/v1/account/signout',
			data: {},
		});
	}
}

const api = new API();

export default api;
