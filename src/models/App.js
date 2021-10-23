import { EventModel } from 'react-event-base/Core';
import axios from 'axios';
import Config from '../Config.js';
import UserFactory from './factory/UserFactory.js';
import { getFileFromGoogleDrive } from './Utils';
import Auth from './Auth.js';

class App extends EventModel {

	constructor(data) {
		super(data);
		this.auth = new Auth({
			app: this,
		});
		this.user = UserFactory.createGuestUser();
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

	async initializeData() {
	}

	setSignInMethod(entry, object) {
        this.signinMethods = this.signinMethods || {};
        this.signinMethods[entry] = object;
	}

	beginFetchUser() {
		this.isFetchingUser = true;
		this.trigger('user:fetch');
	}

	endFetchUser() {
		this.isFetchingUser = false;
		this.trigger('user:fetch');
	}

	emitAuthErrorMessageEvent() {
		this.trigger('auth:message');
	}

	get isUser() {
		return !this.isGuest;
	}

	get isGuest() {
		return this.user.isGuest;
	}

	get hasSignedIn() {
		return this.isUser;
	}

	set user(value) {
		this._user = value;
		this.trigger('user:update');
	}

	get user() {
		return this._user;
	}

	get gapi() {
		return this.signinMethods.google;
	}

	get authInfo() {
		return this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
	}

	async reloadAuth() {
		await this.gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();
	}

	signOutGoogle() {
		try {
			let gapi = this.gapi;
			let auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut();
		} catch(err) {
			console.log(err);
		}
		this.user = UserFactory.createGuestUser();;
	}

	async getDriveInfo() {
		let gapi = this.gapi;
		return await gapi.client.drive.about.get({
			fields: 'user,storageQuota'
		});
	}

	async pickFile() {
		const app = this;
		let gapi = app.gapi;
		return new Promise((resolve, reject) => {
			gapi.load('picker', () => {
				let oauthToken = app.authInfo.access_token;
				let google = window.google;
				let picker = new google.picker.PickerBuilder().
				addView(google.picker.ViewId.DOCS).
				setOAuthToken(oauthToken).
				setDeveloperKey(Config.google.pickerAPIKey).
				setCallback(function(data) {
					// console.log('picker built!', data);
					switch(data.action) {
						case 'loaded':
						break;
						case 'picked':
						resolve(data.docs);
						break;
						case 'cancel':
						reject();
						break;
						default:
						break;
					}
				}).
				build();
				picker.setVisible(true);
			});
		});
	}

	session() {
		return this.client({
			method: 'get',
			url: '/api/v1/account/me',
		});
	}

	signIn() {
		let data = {
			provider: 'google',
			token: this.authInfo.access_token,
		};
		return this.client({
			method: 'post',
			url: '/api/v1/account/signin',
			data: data,
		});
	}

	signUp() {
		let data = {
			provider: 'google',
			token: this.authInfo.access_token,
		};
		return this.client({
			method: 'post',
			url: '/api/v1/account/signup',
			data: data,
		});
	}

	signInPortal() {
		let data = {
			provider: 'google',
			token: this.authInfo.access_token,
		};
		return this.client({
			method: 'post',
			url: '/api/v1/account/signin_portal',
			data: data,
		});
	}

	async signOut() {
		await this.signOutGoogle();
		return this.client({
			method: 'post',
			url: '/api/v1/account/signout',
			data: {},
		});
	}

	uploadFile(file) {
		let metadata = {
		    name: file.name,
		    mimeType: file.type,
		};
		let accessToken = this.authInfo.access_token;
		let form = new FormData();
		form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
		form.append('file', file);
		return axios({
			url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true',
		    method: 'POST',
		    headers: { 'Authorization': 'Bearer ' + accessToken },
		    data: form,
		});
	}

	setFileShared(fileId) {
		return this.gapi.client.drive.permissions.create({
			resource: {
				role: 'reader',
				type: 'anyone',
			},
			fileId: fileId,
			fields: 'id',
		}, function(err, resp) {
			if(err) {
				console.error(err);
			} else {
				console.log(resp);
			}
		});
	}

	async removeLastUpload() {
		if(this.fileId) {
			await this.removeFile(this.fileId);
			delete this.fileId;
		}
	}

	async uploadImage(file) {
		await this.removeLastUpload();
		let resp = await this.uploadFile(file);
		let fileId = resp.data.id;
		await this.setFileShared(fileId);
		this.fileId = fileId;
		return getFileFromGoogleDrive(fileId);
	}

	async getImages() {
		let files = (await this.gapi.client.drive.files.list()).result.files;
		return files.map(file => {
			return getFileFromGoogleDrive(file.id);
		});
	}

	async removeFile(fileId) {
		return await this.gapi.client.drive.files.delete({
			fileId: fileId,
		}).execute();
	}

}

export default new App();
