class Navigation {

	toAdminPortal = () => {
		window.location.href = '/admin_portal';
	}
	refresh = () => {
		window.location.reload();
	}
	setHistory = (history) => {
		this.history = history;
	}
	navTo = (url) => {
		this.history.push(url);
		window.dispatchEvent(new window.CustomEvent('custom:init'));
	}

}
export default new Navigation();
