import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: calc(100% - 300px);
	padding: 0 0 0 30px;
	animation: ${open} ${fadeIn2};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		padding: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: clamp(32px, 3.75vw, 44px) !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
		margin: 0 0 20px 0;
		line-height: 1.5 !important;
	}

	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 50px 0px 10px 0;
	}

	h2 {
		font-size: clamp(22px, 3.05vw, 34px) !important;
	}
	h3 {
		font-size: clamp(14px, 2.05vw, 20px) !important;
	}
	h4,
	h5,
	h6 {
		font-size: clamp(14px, 2.05vw, 20px) !important;
	}

	strong,
	b {
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	}

	p,
	span,
	li,
	div,
	pre {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
		line-height: 1.5 !important;
		// background: ${(props) => props.theme.colors.container.primary.background};
		// border: 1px solid ${(props) => props.theme.colors.border.primary};
		// border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		// box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
		// padding: 20px;
		margin: 20px 0;
	}

	li {
		list-style-type: none;
		padding-left: 1em;
		position: relative;

		&::before {
			content: '\u2022';
			position: absolute;
			left: 0;
			text-align: center;
		}
	}

	a {
		color: ${(props) => props.theme.colors.font.primary.alt4};
		&:hover {
			text-decoration-thickness: 1.65px;
		}
	}

	code {
		padding: 2.5px 10px !important;
		background: ${(props) => props.theme.colors.container.alt3.background} !important;
		border: 1px solid ${(props) => props.theme.colors.border.primary} !important;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	}

	pre {
		padding: 10px !important;
		background: ${(props) => props.theme.colors.container.alt3.background} !important;
		border: 1px solid ${(props) => props.theme.colors.border.primary} !important;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper} !important;
		overflow: auto;
		code {
			padding: 0 !important;
			background: ${(props) => props.theme.colors.transparent} !important;
			border: 1px solid ${(props) => props.theme.colors.transparent} !important;
			font-weight: ${(props) => props.theme.typography.weight.medium} !important;
			border-radius: 0 !important;
			line-height: 1.5 !important;
		}
	}

	img {
		width: 100%;
	}
`;
