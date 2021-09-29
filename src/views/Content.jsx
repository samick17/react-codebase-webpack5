import React from 'react';
import { BaseComponent } from 'react-event-base/Components';
import {
    withStyles,
    CircularProgress,
    Typography,
    Button,
} from '@material-ui/core';
import GoogleSignIn from '../components/GoogleSignIn.jsx';
import GoogleAuth from '../models/GoogleAuth.js';
import App from '../models/App.js';
import UserFactory from '../models/factory/UserFactory.js';

const styles = theme => ({
});

class Content extends BaseComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    onGoogleSignIn = (googleUser) => {
        let user = UserFactory.createUserFromGoogle(googleUser);
        App.user = user;
        App.endFetchUser();
    }

    onGoogleSignInFailed = (error) => {
        this.errorMessage = error.message;
        this.forceUpdate();
    }

    async init() {
        App.beginFetchUser();
        let auth2 = await GoogleAuth.load();
        App.setSignInMethod('google', auth2);
        if(auth2.isSignedIn.get()) {
            let googleUser = auth2.currentUser.get();
            this.onGoogleSignIn(googleUser);
        } else {
            // do nothing
            App.endFetchUser();
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.unbindAppEvents = App.on({
            'user:update': () => {
                this.forceUpdate();
            },
            'user:fetch': () => {
                this.forceUpdate();
            },
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unbindEvent('unbindAppEvents');
    }

    onSignOut = () => {
        App.signOut();
    }

    render() {
        const {
            classes,
        } = this.props;
        const {
            onGoogleSignIn,
            onGoogleSignInFailed,
            errorMessage,
            onSignOut,
        } = this;
        // console.log('isFetchingUser: ', App.isFetchingUser);
        return <div>
            {
                App.isFetchingUser ?
                <div>
                    <CircularProgress/>
                </div> :
                <React.Fragment>
                {
                    App.isUser ?
                    <React.Fragment>
                        <Typography>Hello {App.user.getName()}</Typography>
                        <Button onClick={onSignOut}>SignOut</Button>
                    </React.Fragment> :
                    <React.Fragment>
                        <GoogleSignIn
                        onSignIn={onGoogleSignIn}
                        onSignInFailed={onGoogleSignInFailed}
                        />
                        {
                            errorMessage && <Typography>
                            {
                                errorMessage
                            }
                            </Typography>
                        }
                    </React.Fragment>
                }
                </React.Fragment>
            }
        </div>
    }

}

export default withStyles(styles)(Content);
