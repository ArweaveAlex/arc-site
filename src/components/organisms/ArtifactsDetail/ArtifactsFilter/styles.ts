import styled from 'styled-components';

import { openRight } from 'helpers/animations';

export const FOWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 7;
	background: ${(props) => props.theme.colors.overlay.alt1};
	backdrop-filter: blur(3px);
`;

export const FOContent = styled.div`
	height: 100%;
	width: 330px;
	max-width: 90vw;
	overflow: hidden;
	position: absolute;
	right: 0;
	padding: 0 0 15px 0;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${openRight} 0.2s ease-out forwards;
`;

export const FOTitle = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const FOList = styled.ul`
	height: calc(100% - 50px);
	width: 100%;
	overflow: auto;
	button {
		margin: 0 15px 0 auto;
	}
`;

export const FOSection = styled.div`
	width: calc(100% - 30px);
	padding: 15px 0 10px 0;
	margin: 0 auto 15px auto;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const FOSectionTitle = styled.div`
	margin: 0 0 10px 0;
	padding: 5px 0 10px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.small} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt9} !important;
	}
`;

export const FOSectionLine = styled.div`
	display: flex;
	align-items: center;
	height: 35px;
	p {
		width: 100%;
		font-size: ${(props) => props.theme.typography.size.small} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.active.base} !important;
		margin: 0 0 0 10px;
	}
	svg {
		width: 15px;
		margin: 0 0 0 10px;
		fill: ${(props) => props.theme.colors.icon.alt1.fill};
	}
`;
