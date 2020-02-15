const API_URL =
	window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : 'production-url-here';

export function getMessages() {
	return fetch(API_URL).then((res) => res.json()).then((messages) => {
		// any messages that have the exact same lat and long, combine into a single msg
		const isSameLocation = {};
		return (messages = messages.reduce((acc, cv) => {
			let key = `${cv.latitude.toFixed(2)}, ${cv.longitude.toFixed(2)}`;
			if (isSameLocation[key]) {
				isSameLocation[key].otherMessages = isSameLocation[key].otherMessages || [];
				isSameLocation[key].otherMessages.push(cv);
			} else {
				isSameLocation[key] = cv;
				acc.push(cv);
			}
			return acc;
		}, []));
	});
}

export function getLocation() {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			},
			() => {
				console.log('resolving call to API...');
				resolve(
					fetch('https://ipapi.co/json').then((res) => res.json()).then((location) => {
						return {
							lat: location.latitude,
							lng: location.longitude
						};
					})
				);
			}
		);
	});
}

export function sendMessage(message) {
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(message)
	})
		.then((res) => res.json())
}
