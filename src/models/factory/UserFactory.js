import { EventModel } from 'react-event-base/Core';

class GoogleUser extends EventModel {

	getID() {
		return this.origin.getId();
	}

	getName() {
		return this.origin.getBasicProfile().getName();
	}

}

const UserFactory = {
	createUserFromGoogle: (googleUser) => {
		return new GoogleUser({
			origin: googleUser,
		});
	},
};

export default UserFactory;
