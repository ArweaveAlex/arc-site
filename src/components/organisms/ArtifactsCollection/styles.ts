import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
		flex-direction: column;
	}
`;

export const C2 = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : '95%')};
	width: ${(props) => (props.column ? '100%' : 'calc(100% - 625px)')};
	max-width: 600px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10px 0 0 0;
	overflow: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
		width: 100%;
		margin: 0 auto;
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

export const C2Body = styled.div<{ column: boolean }>`
	height: ${(props) => (props.column ? 'auto' : 'calc(100% - 40px)')};
	width: 100%;
	> * {
		&:not(:last-child) {
			margin: 0 0 15px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
		margin: 0 0 15px 0;
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

export const CarouselContainer = styled.div`
	width: 100%;
	max-width: 600px;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: 100%;
		margin: 20px auto 0 auto;
	}
`;

export const ArtifactPreviewContainer = styled.div`
	max-height: 95%;
	overflow: auto;
	margin: 0 0 0 auto;
	text-align: left !important;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		max-height: none;
		margin: 0 0 20px 0;
	}
`;
