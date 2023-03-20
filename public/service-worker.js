self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith('chrome-extension://')) {
		return;
	}

	if (event.request.url.includes('bundle.js')) {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}

			return fetch(event.request).then((response) => {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				const responseToCache = response.clone();

				caches.open('alex-cache').then((cache) => {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});
