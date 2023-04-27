import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { getImageShadow, STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
`;

export const SubheaderFlex = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 0 20px 0;
`;

export const Body = styled.div`
	width: calc(100% + 25px);
	display: flex;
	flex-wrap: wrap;
	margin: -12.5px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
`;

export const C2 = styled.div<{ image: string }>`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	background-position: center;
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		cursor: pointer;
	}
	img {
		display: block;
		object-fit: cover;
	}
`;

export const Action = styled.button`
	height: 42.5px;
	width: 100%;
	background: ${(props) => props.theme.colors.button.neutral.background};
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		background: ${(props) => props.theme.colors.button.neutral.hover};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.disabled};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: 15px;
	}
	svg {
		margin: 0 0 0 10px;
		width: 20px;
	}
`;

export const Info = styled.div`
	height: calc(100% - 42.5px);
	width: 100%;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.colors.overlay.alt1};
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	transition: background 0.1s;
	padding: 20px;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	&:hover {
		backdrop-filter: blur(2px);
		p,
		span {
			color: ${(props) => props.theme.colors.font.primary.alt2} !important;
		}
		svg {
			fill: ${(props) => props.theme.colors.font.primary.alt2} !important;
		}
	}
`;

export const InfoTitle = styled.div`
	margin: 0 0 10px 0;
	p,
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 24px;
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: ${(props) => props.theme.typography.size.base};
		font-size: 18px;
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const InfoCA = styled(InfoTitle)`
	margin: 0;
	p {
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
	span {
		display: flex;
		align-items: center;
		line-height: auto;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		svg {
			height: 12.5px;
			width: 15px;
			margin: 5px 0 0 5px;
			fill: ${(props) => props.theme.colors.font.primary.base};
		}
	}
	p,
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const PCWrapper = styled.div`
	height: 265px;
	width: calc(33.3% - 30px);
	animation: ${open} ${fadeIn2};
	margin: 15px;
	box-shadow: ${(props) => getImageShadow(props.theme)};
	border-radius: ${STYLING.dimensions.borderRadius};
	position: relative;
	a {
		height: calc(100% - 42.5px);
		width: 100%;
		display: block;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 300px;
		width: calc(100% - 25px);
		margin: 0 0 40px 0;
	}
`;
