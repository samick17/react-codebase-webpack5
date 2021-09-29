export async function loadLib(src, id) {
	return new Promise((resolve, reject) => {
		if(document.querySelector(`script#${id}`)) return;
		const script = document.createElement('script');
		script.setAttribute('id', id);
        script.setAttribute('charset', 'utf-8');
        script.setAttribute('type', 'text/javascript');
		script.onload = () => {
			resolve();
		};
		script.onerror = (err) => {
			console.log('-err-', err);
			reject(err);
		};
		script.src = src;
		document.head.append(script);
	});
}
