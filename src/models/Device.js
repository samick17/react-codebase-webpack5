import {
	isMobileOnly,
	isTablet,
	isDesktop,
} from 'react-device-detect';

class Device {
	get isMobile() {
		return isMobileOnly;
	}
	get isTablet() {
		return isTablet;
	}
	get isDesktop() {
		return isDesktop;
	}
	get classPrefix() {
		if(this.isMobile) {
			return 'm';
		} else if(this.isTablet) {
			return 't';
		} else if(this.isDesktop) {
			return 'd';
		}
	}
	get isWebView() {
		const isStandalone = window.navigator.standalone;
		const userAgent = window.navigator.userAgent.toLowerCase();
		const isSafari = /safari/.test(userAgent);
		const isLine = /line/.test(userAgent);
		let isIOS = /iphone|ipod|ipad/.test(userAgent);
		if(isIOS) {
			if(!isStandalone && isLine) {
				return true;
			} else if(!isStandalone && isSafari) {
				return false;
			} else if(!isStandalone && !isSafari) {
				return true;
			} else {
				return false;
			}
		} else {
			if(userAgent.indexOf('wv') >= 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	get isMessengerWebView() {
		const userAgent = window.navigator.userAgent.toLowerCase();
		const isMessenger = /messenger/.test(userAgent);
		return isMessenger;
	}
}

export default new Device();
