import React from 'react';
import { BaseComponent } from 'react-event-base/Components';
import { loadLib } from '../models/Utils.js';
import UserFactory from '../models/factory/UserFactory.js';
import App from '../models/App.js';
import Config from '../Config.js';

// project: winventor-data

class GoogleSignInButton extends BaseComponent {

  static defaultProps = {
    onSignIn: () => {},
    onSignInFailed: () => {},
  };

  componentDidMount() {
    super.componentDidMount();
    this.load();
  }

  async load() {
    try {
      let googleUser = await this.init();
      this.props.onSignIn(googleUser);
    } catch(err) {
      this.props.onSignInFailed(err);
    }
  }

  init() {
    return new Promise((resolve, reject) => {
      function onSuccess(googleUser) {
        resolve(googleUser);
      }
      function onFailure(error) {
        reject(error);
      }
      function renderButton() {
        gapi.signin2.render('google-signin-btn', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSuccess,
          'onfailure': onFailure
        });
        delete window.renderButton;
      }
      window.renderButton = renderButton;
      loadLib('https://apis.google.com/js/platform.js?onload=renderButton', 'gd-platform');
    });
  }

	render() {
		return <div>
      <meta name="google-signin-client_id" content={`${Config.google_client_id}`}/>
			<div id='google-signin-btn'/>
		</div>
	}

}

export default GoogleSignInButton;
