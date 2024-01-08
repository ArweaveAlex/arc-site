export const STYLING = {
	cutoffs: {
		initial: '1024px',
		initialWrapper: '1200px',
		tablet: '840px',
		secondary: '540px',
		max: '1400px',
		mobileLandscape: '600px',
	},
	dimensions: {
		borderRadius: '5px',
		borderRadiusField: '4.25px',
		borderRadiusWrapper: '10px',
		buttonHeight: '33.5px',
		buttonWidth: '150px',
		rendererWrapper: '600px',
		listRendererWrapper: '500px',
		navHeight: '70px',
		footerHeight: '50px',
		formHeightMin: '37.5px',
		formHeightSm: '45px',
		formHeightMax: '55px',
		formWidthMin: '300px',
		formWidthMax: '500px',
		rendererContent: '650px',
		wrapWidth: '675px',
	},
};

export function getImageShadow(theme: any) {
	return `0 0 5px ${theme.colors.shadow.primary};`;
}
