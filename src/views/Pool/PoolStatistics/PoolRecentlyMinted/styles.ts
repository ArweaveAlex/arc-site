import styled from 'styled-components';

import { loadingSlide } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	margin: 0 0 50px 0;
`;

export const Header = styled.div`
	h2 {
		font-size: 24px;
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const Body = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin: 20px 0 0 0;
	gap: 27.5px;
`;

export const Icon = styled.div`
	height: 72.5%;
	width: 96.5%;
	position: absolute;
	top: 37.5%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	svg {
		width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		fill: ${(props) => props.theme.colors.icon.alt1.fill};
	}
`;

export const TypeLabel = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
	z-index: 1;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const Info = styled.div`
	height: 22.5%;
	width: 96.5%;
	position: absolute;
	top: 86.05%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
`;

export const InfoTitle = styled.div`
	padding: 7.5px;
	p {
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const NLWrapper = styled.div`
	height: 330px;
	min-width: 250px;
	max-width: 250px;
`;

export const NodeWrapper = styled.div`
	height: calc(100% - 15px);
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	position: relative;
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.hover};
	}
	a {
		height: 100%;
		width: 100%;
		display: block;
	}
`;

export const ALinkNT = styled.div`
	height: 15px;
	width: 100%;
	margin: 10px 0 0 0;
	display: flex;
	align-items: center;
	a {
		text-decoration: none !important;
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-size: 13px;
		&:hover {
			color: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
`;

export const Placeholder = styled.div`
	height: 330px;
	min-width: 250px;
	max-width: 250px;
	position: relative;
	background: linear-gradient(
			to right,
			${(props) => props.theme.colors.table.placeholder.backgroundStart},
			${(props) => props.theme.colors.table.placeholder.backgroundSlide} 50%,
			${(props) => props.theme.colors.table.placeholder.backgroundEnd} 80%
		),
		${(props) => props.theme.colors.table.placeholder.background};
	background-repeat: repeat-y;
	background-size: 50px 500px;
	background-position: 0 0;
	animation: ${loadingSlide} 1.25s infinite;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const NoArtifactsContainer = styled.div`
	height: 100%;
	width: 100%;
	p {
		color: ${(props) => props.theme.colors.warning};
	}
`;
