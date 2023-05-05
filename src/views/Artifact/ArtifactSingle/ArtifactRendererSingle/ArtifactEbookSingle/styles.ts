import styled, { css, DefaultTheme } from 'styled-components';

import { fadeIn2, open, openLeft } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div<{ fullScreen: boolean }>`
	height: 665px;
	width: 100%;
	animation: ${open} ${fadeIn2};
	${(props) =>
		props.fullScreen &&
		css`
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 9999;
		`}
`;

export const ViewerWrapper = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
	position: relative;
`;

export const TitleAction = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	p {
		font-size: ${(props) => props.theme.typography.size.small} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
		max-width: 60%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const Viewer = styled.div`
	height: calc(100% - 50px);
	width: 100%;
`;

export function epubjsGlobalStyles(theme: DefaultTheme) {
	return `
        body {
            color: ${theme.colors.font.primary.alt8} !important;
            font-family: ${theme.typography.family.primary} !important;
            line-height: 1.5 !important;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: ${theme.typography.family.alt1} !important;
            font-weight: ${theme.typography.weight.bold} !important;
            color: ${theme.colors.font.primary.alt8} !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        h1, h2 {
            margin: 20px 0 !important;
        }

        h1 {
            font-size: clamp(20px, 2.5vw, 24px) !important;
        }

        h2 {
            font-size: clamp(18px, 2.25vw, 22px) !important;
        }

        h2 > a {
            color: ${theme.colors.font.primary.alt8} !important;
            text-decoration: none !important;
            &:hover {
                text-decoration: none !important;
            }
            &:focus {
                text-decoration: none !important;
            }
        }

        a {
            color: ${theme.colors.font.primary.alt11} !important;
            text-decoration: none !important;
        }

        p {
            color: ${theme.colors.font.primary.alt8} !important;
            font-family: ${theme.typography.family.alt1} !important;
            font-size: 16px !important;
        }
    `;
}

export const NextAction = styled.button`
	height: 450px;
	max-height: 70%;
	width: 43.5px;
	background: ${(props) => props.theme.colors.transparent};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-bottom-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	position: absolute;
	z-index: 1;
	right: 0;
	top: 50%;
	transform: translate(0, -50%);
	transition: background 0.25s;
	svg {
		width: 20px;
		padding: 0 0 0 2.5px;
		fill: ${(props) => props.theme.colors.transparent};
	}
	&:hover {
		background: ${(props) => props.theme.colors.button.overlay.background};
		svg {
			fill: ${(props) => props.theme.colors.icon.primary.fill};
		}
	}
`;

export const PrevAction = styled(NextAction)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	right: auto;
	svg {
		padding: 0 2.5px 0 0;
	}
`;

export const NWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 2;
	background: ${(props) => props.theme.colors.overlay.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	backdrop-filter: blur(2px);
`;

export const NContent = styled.div`
	height: 100%;
	width: 250px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-bottom-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	animation: ${openLeft} 0.2s ease-out forwards;
`;

export const NTitle = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const NList = styled.ul`
	height: calc(100% - 50px);
	width: 100%;
	overflow: auto;
	> * {
		&:last-child {
			border-bottom: none;
		}
	}
`;

export const NListItem = styled.li<{ disabled: boolean }>`
	pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
	text-align: center;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 13px;
	line-height: 1.35;
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border-bottom: 1px solid
		${(props) => (props.disabled ? props.theme.colors.button.alt2.disabled.border : props.theme.colors.border.primary)};
	background: ${(props) =>
		props.disabled ? props.theme.colors.button.alt2.disabled.background : props.theme.colors.button.alt2.background};
	padding: 10px 15px;
	&:hover {
		background: ${(props) =>
			props.disabled
				? props.theme.colors.button.alt2.disabled.background
				: props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const PStart = styled.div`
	height: 20px;
	width: 20px;
	position: absolute;
	bottom: 20px;
	z-index: 1;
	left: 25%;
	transform: translate(-50%, 0);
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.small} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
	@media (max-width: 881px) {
		left: 50%;
	}
`;

export const PEnd = styled(PStart)`
	left: 75%;

	@media (max-width: 881px) {
		display: none;
	}
`;

export const C2 = styled.div`
	height: auto;
	width: 100%;
	margin: 30px 0 0 0;
	overflow: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export const C2Header = styled.div`
	height: 40px;
	width: 100%;
	display: flex;
	align-items: flex-start;
	p {
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
	}
`;

export const C2Body = styled.div`
	height: auto;
	width: 100%;
	> * {
		&:not(:last-child) {
			margin: 0 0 15px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;

export const ContentLine = styled.div`
	width: 100%;
	padding: 17.5px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	position: relative;
`;

export const InfoData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	button,
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
	button {
		&:hover {
			color: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
	p,
	code,
	a {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		line-height: 22px;
	}
	span,
	p,
	a {
	}
	svg {
		width: 25px;
		margin: 0 10px 0 0;
		fill: ${(props) => props.theme.colors.font.primary.alt5};
	}
	p,
	span,
	a {
		line-height: 22px;
		text-align: left;
	}
	overflow: hidden;
	overflow-wrap: anywhere;
`;

export const BodyData = styled.p`
	margin: 15px 0 0 0;
`;

export const TP = styled.div`
	height: 60px;
	width: 100%;
`;

export const BP = styled.div`
	height: 80px;
	width: 100%;
	margin: 0 0 15px 0;
`;
