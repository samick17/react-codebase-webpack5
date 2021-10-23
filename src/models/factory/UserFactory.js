import { EventModel } from 'react-event-base/Core';

class GoogleUser extends EventModel {

	get isGuest() {return false;}

	getID() {
		return this.origin.getId();
	}

	getName() {
		return this.origin.getBasicProfile().getName();
	}

	getAvatar() {
		return this.origin.getBasicProfile().getImageUrl();
	}

}

class GuestUser extends EventModel {

	get isGuest() {return true;}

	getID() {
		return '0000';
	}

	getName() {
		return 'Guest';
	}

	getAvatar() {
		return '';
	}

}

const UserFactory = {
	createUserFromGoogle: (googleUser, userData) => {
		return new GoogleUser({
			origin: googleUser,
			userData: userData,
		});
	},
	createGuestUser: () => {
		return new GuestUser();
	},
};

export default UserFactory;
