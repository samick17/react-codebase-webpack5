import React from 'react';
import { BaseComponent } from 'react-event-base/Components';
import { withStyles } from '@mui/styles';
import {
    isMobileOnly,
} from 'react-device-detect';
import App from '../models/App.js';
import Overlay from '../components/layout/Overlay.jsx';
import Center from '../components/layout/Center.jsx';
import GoogleSignIn from '../components/GoogleSignIn.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';

const styles = theme => ({
    wrapper: props => {
        return {
            position: 'relative',
            overflow: 'auto',
            height: isMobileOnly ? `calc(100% - 16vh)` : 'calc(100% - 120px)',
        };
    },
    content: {
        margin: '1vmin',
    },
});

class Content extends BaseComponent {

    constructor(props) {
        super(props);
        App.auth.init();
    }

    setErrorMessage(err) {
        let message = err.response?.data?.msg || err.message;
        this.errMessage = message;
        if(this.errTimer) {
            window.clearTimeout(this.errTimer);
            delete this.errTimer;
        }
        this.errTimer = window.setTimeout(() => {
            delete this.errTimer;
            delete this.errMessage;
            this.forceUpdate();
        }, 5000);
    }

    componentDidMount() {
        super.componentDidMount();
        const updateView = () => {
            this.forceUpdate();
        };
        this.unbindAppEvents = App.on({
            'user:update': updateView,
            'user:fetch': updateView,
            'auth:message': updateView,
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unbindEvent('unbindAppEvents');
    }

    renderLoadingView = () => {
        return <Overlay>
            <Center>
                <Loading/>
            </Center>
        </Overlay>
    }

    renderUserView = () => {
        const {
            classes,
        } = this.props;
        return <div className={classes.content}>
        </div>
    }

    renderGuestView = () => {
        const {
            onGoogleSignIn,
            onGoogleSignInFailed,
            errMessage,
        } = App.auth;
        return <Overlay>
            <Center>
                <React.Fragment>
                    <GoogleSignIn
                    onSignIn={onGoogleSignIn}
                    onSignInFailed={onGoogleSignInFailed}
                    />
                    {
                        errMessage && <ErrorMessage message={errMessage}/>
                    }
                </React.Fragment>
            </Center>
        </Overlay>
    }

    renderEmpty = () => {
        return <React.Fragment/>
    }

    render() {
        const {
            classes,
        } = this.props;
        const {
            renderLoadingView,
            renderUserView,
            renderGuestView,
            renderEmpty,
        } = this;
        return <div className={classes.wrapper} aria-label='content'>
            {
                App.isFetchingUser ?
                renderLoadingView() :
                <React.Fragment>
                {
                    App.isUser ?
                    App.isProposing ? renderEmpty() : renderUserView() :
                    renderGuestView()
                }
                </React.Fragment>
            }
        </div>
    }

}

export default withStyles(styles)(Content);
