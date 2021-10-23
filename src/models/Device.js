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
}

export default new Device();
