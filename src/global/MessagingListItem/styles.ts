import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const LIWrapper = styled.div<{ isListItem: boolean; active: boolean }>`
	width: 100%;
	border-bottom: ${(props) => (props.isListItem ? `1px solid ${props.theme.colors.border.primary}` : 'none')};
	animation: ${open} ${fadeIn2};
`;

export const LIContent = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px 25px;
`;

export const LIHeader = styled.div`
	height: 48px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		height: fit-content;
		flex-direction: column;
	}
`;

export const ProfileWrapper = styled.div`
	display: flex;
`;

export const ProfileImage = styled.div`
	height: 100%;
	width: 48px;
	margin: 0 15px 0 0;
	img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
`;

export const NUContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const P = styled.p`
	font-size: ${(props) => props.theme.typography.size.small} !important;
`;

export const Name = styled(P)`
	line-height: 24px;
	color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	max-width: 190px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Username = styled(P)`
	font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	margin: 5px 0 !important;
`;

export const AInfoWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: end;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 20px 0 0 0;
		gap: 10px;
		align-items: start;
	}
`;

export const ALinkWrapper = styled.div`
	display: flex;
`;

export const ALink = styled.div`
	display: flex;
	span,
	a {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		line-height: 18px;
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
	a {
		font-weight: ${(props) => props.theme.typography.weight.medium};
		white-space: nowrap;
		&:hover {
			text-decoration-thickness: 1.5px;
		}
	}
`;

export const ALinkNT = styled.div`
	margin: 0 0 0 12.5px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	svg {
		width: 12.5px;
		fill: ${(props) => props.theme.colors.button.alt1.background};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		&:hover {
			fill: ${(props) => props.theme.colors.button.alt1.hover};
		}
	}
`;

export const LIBody = styled.div`
	height: 100%;
	width: 100%;
	margin: 25px 0 0 0;
`;

export const InfoData = styled.div`
	span {
		font-size: 13px !important;
		color: ${(props) => props.theme.colors.font.primary.alt4} !important;
	}
	p,
	a {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		line-height: 18px !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
	span,
	p,
	a {
		height: fit-content !important;
		text-overflow: ellipsis !important;
		overflow: hidden !important;
		white-space: nowrap !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	}
	overflow: hidden;
`;

export const Message = styled(InfoData)`
	margin: 0 0 15px 0;
	span,
	p,
	a,
	b {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		line-height: 1.5 !important;
		overflow: visible !important;
		white-space: pre-wrap !important;
	}
	span,
	b {
		color: ${(props) => props.theme.colors.font.primary.alt4} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	}
`;

export const PostDate = styled(P)`
	font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	margin: 20px 0 0 0 !important;
`;

export const PublicMetrics = styled.div`
	width: 290px;
	max-width: 65.5vw;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	margin: 20px 0 0 0 !important;
`;

export const Metric = styled.div`
	display: flex;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0 12.5px 0 0;
	svg {
		width: 13.5px;
		fill: ${(props) => props.theme.colors.font.primary.alt9};
		margin: 0 !important;
	}
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		color: ${(props) => props.theme.colors.font.primary.alt9} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		margin: 0 0 3.5px 5.5px !important;
		white-space: nowrap !important;
		height: auto !important;
	}
`;

export const SingleWrapper = styled.div`
	width: ${STYLING.dimensions.listRendererWrapper};
	position: absolute;
	right: 0;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		right: auto;
		margin: 0 auto 20px auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		right: auto;
		margin: 0 auto 20px auto;
	}
`;

export const SingleContent = styled.div`
	height: 80vh;
	width: 500px;
	position: fixed;
	overflow-y: auto;
	overflow-x: hidden;
	top: ${STYLING.dimensions.navHeight};

	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		height: auto;
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		top: auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		height: auto;
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		top: auto;
	}
`;

export const HeaderWrapper = styled.div`
	min-height: 141.5px;
	width: 100%;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 20px 20px 15px 20px;
	margin: 0 0 20px 0;
	a {
		font-size: 22px;
		font-weight: 500;
		white-space: nowrap;
		&:hover {
			text-decoration-thickness: 1.5px;
		}
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		margin: 20px 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		margin: 20px 0;
	}
`;

export const HeaderContent = styled.div`
	height: 100%;
	width: 100%;
	animation: ${open} ${fadeIn2};
`;

export const SubheaderFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 0 0 0;
`;

export const SubheaderContainer = styled.div`
	display: flex;
	margin: 7.5px 0;
	white-space: nowrap;
	overflow: hidden;
`;

export const Subheader1 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		line-height: 20px !important;
		color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	}
`;

export const Subheader2 = styled.div`
	p,
	a {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		line-height: 20px !important;
		height: fit-content !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		color: ${(props) => props.theme.colors.font.primary.alt4} !important;
	}
`;

export const ID = styled(Subheader2)``;

export const LoadingContainerInit = styled.div`
	height: 100px;
	width: 100%;
	position: relative;
	margin: 20px 0 0 0;
`;

export const ActionContainer = styled.div`
	height: 42.5px;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	button {
		height: 100% !important;
		width: 100% !important;
		border: none !important;
	}
`;

export const ActiveContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 1.15px 7.5px 0 0;
	svg {
		height: 15px;
		width: 15px;
		fill: ${(props) => props.theme.colors.icon.alt1.fill};
	}
	display: none;
`;

export const ChildAssetContainer = styled.div`
	min-height: 141.5px;
	width: 100%;
	margin: 15px 0 0 0;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt3};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const MediaWrapper = styled.div`
	width: ${STYLING.dimensions.messagingContent};
	max-width: 100%;
	margin: 0 auto;
	position: relative;
`;

export const MediaElement = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MediaContent = styled.div`
	height: ${STYLING.dimensions.messagingContent};
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt5.background};
	border-radius: ${STYLING.dimensions.borderRadius};
`;

export const ImageContent = styled(MediaContent)<{ image: string }>`
	height: ${STYLING.dimensions.messagingContent};
	background-image: ${(props) => `url("${props.image}")`};
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
`;

export const VideoContent = styled.video`
	height: 98.5%;
	width: 100%;
	cursor: pointer;
	source {
		cursor: pointer;
	}
`;

export const VideoSource = styled.source``;

export const ArweaveLinkWrapper = styled.div`
	background: ${(props) => props.theme.colors.container.primary.background};
	height: 100px;
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	margin: 20px 0;
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.hover};
	}
	a {
		text-decoration: none !important;
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const ArweaveLink = styled.a`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
