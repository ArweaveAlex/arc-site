import React from 'react';

export function useMutation(elementId: string) {
	const [hasElement, setHasSubheader] = React.useState<boolean>(false);

	React.useEffect(() => {
		const subheader = document.getElementById(elementId);
		if (subheader) {
			const observer = new MutationObserver((mutationsList) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						setHasSubheader(subheader.childNodes.length > 0);
					}
				}
			});

			observer.observe(subheader, { childList: true });

			return () => {
				observer.disconnect();
			};
		}
	}, []);

	return hasElement;
}
