import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { getImageShadow, STYLING } from 'helpers/styling';

export const ICWrapper = styled.div<{ column: boolean }>`
	height: calc(100% - 15px);
	max-height: 550px;
	width: 100%;
	display: flex;
	flex-direction: ${(props) => (props.column ? 'column' : 'row')};
	max-height: ${(props) => (props.column ? 'none' : '550px')};
	justify-content: space-between;
	padding: 25px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		flex-direction: column;
		max-height: none;
	}
`;

export const C1 = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : '100%')};
	width: ${(props) => (props.column ? '100%' : '50%')};
	a {
		&:hover {
			text-decoration: none;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
	}
`;

export const C1Content = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : '100%')};
	width: ${(props) => (props.column ? '100%' : 'calc(100% - 10px)')};
	text-align: left;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
	}
`;

export const Title = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : '70px')};
	width: 100%;
	overflow: hidden;
	a,
	p {
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: 22px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
	}
	a {
		&:hover {
			text-decoration: underline;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 125px;
		background: ${(props) => props.theme.colors.container.primary.background};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		padding: 17.5px;
		p,
		a {
			font-size: clamp(16px, 3vw, 22px);
		}
	}
`;

export const ImageWrapper = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? '300px' : 'calc(100% - 100px)')};
	width: 100%;
	margin: ${(props) => (props.column ? '20px 0 40px 0' : '0')};
	background: ${(props) => props.theme.colors.container.alt5.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: ${(props) => getImageShadow(props.theme)};
	cursor: zoom-in;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 300px;
		margin: 20px 0 40px 0;
	}
`;

export const Image = styled.img<{ loaded: boolean; column: boolean }>`
	height: 100%;
	width: 100%;
	margin: 0;
	object-fit: contain;
	display: ${(props) => (props.loaded ? 'block' : 'none')} !important;
`;

export const C2 = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : '100%')};
	width: ${(props) => (props.column ? '100%' : '47.5%')};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
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
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
	}
`;

export const C2Body = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : 'calc(100% - 40px)')};
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
	}
`;

export const ContentLine = styled.div`
	width: 100%;
	margin: 0 0 15px 0;
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
