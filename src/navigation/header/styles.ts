import styled from 'styled-components';

import { fadeIn1, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.header`
	height: ${STYLING.dimensions.navHeight};
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 6;
	background: ${(props) => props.theme.colors.navigation.header.background};
`;

export const NavContainer = styled.div`
	height: 100%;
	max-width: ${STYLING.cutoffs.max};
	display: flex;
	position: relative;
	margin: 0 auto;
`;

export const LogoContainer = styled.div`
	position: absolute;
	left: 0;
	height: 100%;
	margin: 0 0 0 20px;
	display: flex;
	align-items: center;
	a {
		&:hover {
			text-decoration: none;
			opacity: 0.85;
		}
		&:focus {
			text-decoration: none;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		left: auto;
		width: auto;
	}
`;

export const LogoLink = styled.a`
	height: 100%;
`;

export const LogoContent = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 5px 0;
	svg {
		fill: ${(props) => props.theme.colors.navigation.header.logoFill};
	}
`;

export const NC = styled.div`
	height: 100%;
	width: fit-content;
	max-width: 77.5vw;
	right: 0;
	position: absolute;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		width: auto;
		max-width: none;
	}
`;

export const SWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 8.5%;
	transform: translate(0%, -50%);
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		top: auto;
		left: auto;
		transform: translate(0, 0);
		margin: 0 10px 0 0;
	}
`;

export const NavPaths = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		display: block;
	}
`;

export const SC = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		right: auto;
		height: auto;
		flex-direction: column;
		align-items: start;
		padding: 0 20px;
	}
`;

export const Connect = styled.div<{ show: boolean }>`
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 20px 0 17.5px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: ${(props) => (props.show ? 'block' : 'none')};
		height: auto;
		margin-top: 25px;
		flex-direction: column;
		align-items: start;
	}
`;

export const NCMobile = styled(NC)`
	flex-direction: column;
`;

export const Menu = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin-top: 2.5px;
	padding: 0 3.5px 0 0;
`;

export const SubpathWrapper = styled.div`
	min-width: 250px;
	position: absolute;
	left: 20px;
	margin: -12.5px 0 0 0;
	padding: 10px;
	display: none;
	a {
		padding: 0 !important;
		justify-content: flex-start !important;
		padding: 12.5px 5px !important;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: block;
		position: relative;
		margin: 0;
		padding: 0;
		min-width: 0;
		left: 0;
		a {
			height: 60px;
			width: 100vw !important;
			justify-content: left;
			padding: 0 35px !important;
		}
	}
`;

export const LinkWrapper = styled.div`
	height: 100%;
	position: relative;
	&:hover {
		${SubpathWrapper} {
			display: block;
			animation: ${open} ${fadeIn1};
		}
	}
	a {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		svg {
			width: 12.5px;
			margin: 2.5px 0 0 10px;
			fill: ${(props) => props.theme.colors.font.primary.active.base};
		}
		&:hover {
			text-decoration: none;
			color: ${(props) => props.theme.colors.font.primary.active.hover};
			svg {
				fill: ${(props) => props.theme.colors.font.primary.active.hover};
			}
			${SubpathWrapper} {
				display: block;
			}
		}
		&:focus {
			text-decoration: none;
			color: ${(props) => props.theme.colors.font.primary.active.hover};
			svg {
				fill: ${(props) => props.theme.colors.font.primary.active.hover};
			}
		}
		@media (max-width: ${STYLING.cutoffs.initial}) {
			height: 60px;
			width: 100vw;
			justify-content: left;
			padding: 0 35px;
			&:hover {
				text-decoration: none;
				background: ${(props) => props.theme.colors.container.primary.hover};
			}
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
	}
`;

export const OpenContainer = styled.div<{ hasSubheader: boolean }>`
	position: absolute;
	height: calc(100vh - ${STYLING.dimensions.navHeight});
	overflow: auto;
	width: 100vw;
	z-index: 4;
	padding: 0 20px;
	margin: ${(props) =>
			props.hasSubheader ? `calc(${STYLING.dimensions.navHeight} * 2)` : STYLING.dimensions.navHeight}
		0 0 0;
	background: ${(props) => props.theme.colors.container.primary.background};
	animation: ${open} ${fadeIn1};
`;

export const MenuContainer = styled.div`
	height: 100%;
	width: 50px;
	z-index: 5;
	position: relative;
`;
