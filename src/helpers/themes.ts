import { DefaultTheme } from 'styled-components';

const DEFAULT = {
	neutral1: '#FFFFFF',
	neutral2: '#F2F3F4',
	neutral3: '#EEEEEE',
	neutral4: '#3A3A3A',
	neutral5: '#EAEAEA',
	neutral6: '#D9D9D9',
	neutral7: '#959595',
	neutral8: '#ACACAC',
	neutral9: '#F4F5F6',
	neutral10: '#BABABA',
	neutral11: '#000000',
	neutral12: '#FAFAFA',
	neutral13: '#F7F7F7',
	neutral14: '#FFFFFF',
	primary: '#003153',
	primary2: '#265F85',
	primary3: '#4C8CB8',
	primary4: '#A4CCE9',
	alt1: '#DAA520',
	alt2: '#FFD877',
	overlay1: 'rgba(193, 193, 193, 0.75)',
	overlay2: 'rgba(193, 193, 193, 0.75)',
	overlay3: 'rgba(193, 193, 193, 0.85)',
	warning: '#EE3C3C',
	warningShadow: '#F27979',
	success: '#32C422',
	neutral: '#FFB600',
	transparent: 'rgba(255, 255, 255, 0)',
	semiTransparent: 'rgba(255, 255, 255, 0.5)',
	imageShadow1: '#a2a2a2b0',
	imageShadow2: '#000000ba'
};

export const defaultTheme: DefaultTheme = {
	scheme: 'light',
	colors: {
		border: {
			primary: DEFAULT.neutral5,
			alt1: DEFAULT.neutral5,
			alt2: DEFAULT.primary3,
			alt3: DEFAULT.primary4,
			alt4: DEFAULT.primary,
			alt5: DEFAULT.neutral5,
			alt6: DEFAULT.neutral6,
		},
		button: {
			primary: {
				background: DEFAULT.neutral1,
				border: DEFAULT.primary,
				hover: DEFAULT.neutral9,
				label: DEFAULT.primary,
				active: {
					background: DEFAULT.primary,
					hover: DEFAULT.primary2,
					label: DEFAULT.neutral1,
				},
				disabled: {
					background: DEFAULT.neutral5,
					border: DEFAULT.neutral3,
					label: DEFAULT.neutral7,
				},
			},
			alt1: {
				background: DEFAULT.primary,
				border: DEFAULT.transparent,
				hover: DEFAULT.primary3,
				label: DEFAULT.neutral1,
				active: {
					background: DEFAULT.neutral1,
					hover: DEFAULT.neutral9,
					label: DEFAULT.primary,
				},
				disabled: {
					background: DEFAULT.neutral5,
					border: DEFAULT.neutral3,
					label: DEFAULT.neutral7,
				},
			},
			alt2: {
				background: DEFAULT.neutral1,
				border: DEFAULT.neutral5,
				hover: DEFAULT.neutral2,
				label: DEFAULT.primary,
				active: {
					background: DEFAULT.primary3,
					hover: DEFAULT.primary2,
					label: DEFAULT.neutral1,
				},
				disabled: {
					background: DEFAULT.neutral13,
					border: DEFAULT.neutral3,
					label: DEFAULT.neutral7,
				},
			},
		},
		checkbox: {
			active: {
				background: DEFAULT.alt1,
			},
			background: DEFAULT.neutral1,
			hover: DEFAULT.neutral9,
			border: DEFAULT.neutral5,
			disabled: DEFAULT.neutral5,
		},
		container: {
			primary: {
				background: DEFAULT.neutral1,
				hover: DEFAULT.neutral9,
			},
			alt1: {
				background: DEFAULT.primary,
			},
			alt2: {
				background: DEFAULT.primary2,
			},
			alt3: {
				background: DEFAULT.neutral9,
			},
			alt4: {
				background: DEFAULT.neutral12,
			},
			alt5: {
				background: DEFAULT.neutral11,
			},
			alt6: {
				background: DEFAULT.neutral14,
			},
		},
		font: {
			primary: {
				base: DEFAULT.neutral1,
				alt1: DEFAULT.neutral4,
				alt2: DEFAULT.alt1,
				alt3: DEFAULT.alt2,
				alt4: DEFAULT.primary3,
				alt5: DEFAULT.primary4,
				alt6: DEFAULT.neutral7,
				alt7: DEFAULT.neutral8,
				alt8: DEFAULT.neutral11,
				active: {
					base: DEFAULT.primary,
					hover: DEFAULT.primary3,
				},
				invalid: DEFAULT.warning,
			},
		},
		form: {
			background: DEFAULT.neutral1,
			border: DEFAULT.neutral6,
			invalid: {
				outline: DEFAULT.warning,
				shadow: DEFAULT.warningShadow,
			},
			valid: {
				outline: DEFAULT.primary3,
				shadow: DEFAULT.primary4,
			},
			disabled: {
				background: DEFAULT.neutral2,
				label: DEFAULT.neutral7,
			},
		},
		icon: {
			primary: {
				fill: DEFAULT.neutral1,
				hover: DEFAULT.neutral6,
				alt1: {
					fill: DEFAULT.neutral7,
				},
			},
			alt1: {
				fill: DEFAULT.alt1,
			},
			alt2: {
				fill: DEFAULT.neutral4,
			},
			inactive: DEFAULT.neutral4,
		},
		image: {
			shadow1: DEFAULT.imageShadow1,
			shadow2: DEFAULT.imageShadow2,
		},
		indicator: {
			active: {
				base: DEFAULT.primary,
				hover: DEFAULT.primary2,
			},
			inactive: {
				base: DEFAULT.neutral6,
				hover: DEFAULT.neutral8,
			},
		},
		navigation: {
			footer: {
				background: DEFAULT.neutral1,
			},
			header: {
				background: DEFAULT.neutral1,
				logoFill: DEFAULT.primary,
			},
		},
		notification: {
			success: DEFAULT.success,
			warning: DEFAULT.warning,
			neutral: DEFAULT.neutral,
		},
		overlay: {
			primary: DEFAULT.overlay1,
			alt1: DEFAULT.overlay2,
			alt2: DEFAULT.overlay3,
		},
		shadow: {
			primary: DEFAULT.neutral7,
			alt1: DEFAULT.neutral2
		},
		table: {
			placeholder: {
				background: DEFAULT.neutral2,
				backgroundStart: DEFAULT.transparent,
				backgroundSlide: DEFAULT.semiTransparent,
				backgroundEnd: DEFAULT.transparent,
			},
		},
		tabs: {
			active: DEFAULT.primary,
			inactive: DEFAULT.transparent,
		},
		transparent: DEFAULT.transparent,
		view: {
			background: DEFAULT.neutral1,
		},
		warning: DEFAULT.warning,
	},
	typography: {
		family: {
			primary: "'Fira Sans', sans-serif",
			alt1: "'PT Serif', serif",
		},
		size: {
			h1: '48px',
			h2: '24px',
			base: '16px',
			small: '15px',
			xSmall: '14px',
			xxSmall: '13px'
		},
		weight: {
			regular: '400',
			medium: '500',
			bold: '600',
		},
	},
};
