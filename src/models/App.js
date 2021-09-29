import { EventModel } from 'react-event-base/Core';

class App extends EventModel {

	constructor(data) {
		super(data);
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

	get isUser() {
		return !!this.user;
	}

	get isGuest() {
		return !this.user;
	}

	get hasSignedIn() {
		return !!this.user;
	}

	set user(value) {
		this._user = value;
		this.trigger('user:update');
	}

	get user() {
		return this._user;
	}

	signOut() {
		try {
			this.signinMethods.google.signOut();
		} catch(err) {
			console.log(err);
		}
		this.user = null;
	}

}

export default new App();
