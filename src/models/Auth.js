import { EventModel } from 'react-event-base/Core';
import UserFactory from './factory/UserFactory.js';
import GoogleAuth from './GoogleAuth.js';
import API from './API.js';

class Auth extends EventModel {

    get gapi() {
        return this.app.gapi;
    }

    async signInRequest() {
        const { app } = this;
        try {
            await API.session();
            return true;
        } catch(err) {
            try {
                let res = await app.signInPortal();
                console.log(err);
                return true;
            } catch(err) {
                console.log(err);
                window.err = err;
                this.setErrorMessage(err);
                return false;
            }
        }
    }

    setErrorMessage(err) {
        const { app } = this;
        let message = err.response?.data?.msg || err.message;
        this.errMessage = message;
        app.emitAuthErrorMessageEvent();
        if(this.errTimer) {
            window.clearTimeout(this.errTimer);
            delete this.errTimer;
        }
        this.errTimer = window.setTimeout(() => {
            delete this.errTimer;
            delete this.errMessage;
            app.emitAuthErrorMessageEvent();
        }, 5000);
    }

    async init() {
        const { app } = this;
        app.beginFetchUser();
        let gapi = await GoogleAuth.load();
        let auth2 = gapi.auth2.getAuthInstance();
        app.setSignInMethod('google', gapi);
        if(auth2.isSignedIn.get()) {
            await this.onGoogleSignIn();
        } else {
            // do nothing
            app.endFetchUser();
        }
    }

    onGoogleSignIn = async () => {
        const { app } = this;
        let gapi = this.gapi;
        let auth2 = gapi.auth2.getAuthInstance();
        let googleUser = auth2.currentUser.get();
        if(await this.signInRequest()) {
            let user = UserFactory.createUserFromGoogle(googleUser, {});
            app.user = user;
            await app.initializeData();
        }
        app.endFetchUser();
    }

    onGoogleSignInFailed = (err) => {
        this.setErrorMessage(err);
    }
}

export default Auth;
