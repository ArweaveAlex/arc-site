import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
    display: flex;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		width: auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: auto;
	}
`;

export const ListWrapper = styled.div`
	width: ${STYLING.dimensions.rendererWrapper};
	max-width: 100%;
	margin: 0 auto;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	overflow: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export const PostWrapper = styled.div`
	width: 100%;
	padding: 20px;
`;

export const HeaderWrapper = styled(PostWrapper)``;

export const PostContent = styled.div`
	width: 100%;
	animation: ${open} ${fadeIn2};
	word-wrap: break-word;
	p {
		height: fit-content !important;
		margin: 0;
		line-height: 1.5 !important;
		overflow: visible !important;
		white-space: normal !important;
	}
`;

export const HeaderContent = styled(PostContent)``;

export const HeaderFlex = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const HeaderInfo = styled.div``;

export const HeaderSubReddit = styled.p`
	width: fit-content;
	padding: 5px 10px;
	margin: 0 0 20px 0 !important;
	font-size: ${(props) => props.theme.typography.size.small} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	color: ${(props) => props.theme.colors.font.primary.alt8} !important;
	background: ${(props) => props.theme.colors.container.alt4.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
`;

export const HeaderAD = styled.p`
	font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	margin: 0 0 5px 0 !important;
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt8} !important;
	}
`;

export const HeaderBody = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const HeaderTitle = styled.p<{ width: number }>`
	width: ${(props) => `${props.width.toString()}%`};
	font-size: 20px !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	color: ${(props) => props.theme.colors.font.primary.alt8} !important;
	margin: 0 20px 20px 0 !important;
`;

export const HeaderBodyPreview = styled.div<{ image: string }>`
	height: 125px;
	width: 25%;
	min-width: 125px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	background-position: center;
	img {
		height: 100%;
		width: 100%;
	}
`;

export const PublicMetrics = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
`;

export const Metric = styled.div`
	display: flex;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0 12.5px 0 0;
	svg {
		width: 13.5px;
		fill: ${(props) => props.theme.colors.font.primary.alt8};
		margin: 0 !important;
	}
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		color: ${(props) => props.theme.colors.font.primary.alt8} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		margin: 0 0 3.5px 5.5px !important;
		white-space: nowrap !important;
		height: auto !important;
	}
`;

export const DetailWrapper = styled(PostWrapper)`
	padding 0 20px;
`;

export const DetailContent = styled(PostContent)``;

export const CommentGroup = styled.div``;

export const Comment = styled.div<{ depth: number }>`
	margin: ${(props) => `0 0 20px ${props.depth * 15}px`};
`;

export const CommentAuthor = styled.div`
	display: flex;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt8} !important;
		margin: 0 !important;
	}
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	}
	margin: 0 0 7.5px 0 !important;
`;

export const CommentBody = styled.p`
	font-size: ${(props) => props.theme.typography.size.small} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.font.primary.alt1} !important;
`;

export const LoadingContainer = styled.div`
	height: 200px;
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	position: relative;
`;
