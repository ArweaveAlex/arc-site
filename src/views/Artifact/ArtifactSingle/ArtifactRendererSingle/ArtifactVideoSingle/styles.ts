import styled from 'styled-components';

import { RangeBar } from 'app/styles';
import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 750px;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	max-width: 90vw;
	animation: ${open} ${fadeIn2};
	position: relative;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: auto;
	}
`;

export const Video = styled.video`
	height: 90%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	object-fit: cover;
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 500px;
		position: relative;
		top: auto;
		left: auto;
		right: auto;
		bottom: auto;
	}
`;

export const DisplayWrapper = styled.div<{ playing: boolean }>`
	height: 90%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	object-fit: cover;
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	background: ${(props) => props.theme.colors.overlay.alt1};
	display: ${(props) => (props.playing ? 'none' : 'flex')};
	justify-content: center;
	align-items: center;
	p {
		text-align: center !important;
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 500px;
	}
`;

export const VideoSource = styled.source``;

export const Content = styled.div`
	height: 10%;
	width: 100%;
	position: absolute;
	bottom: 0;
	animation: ${open} ${fadeIn2};
	padding: 20px;
	margin: -2.5px 0 0 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 200px;
		position: relative;
		bottom: auto;
		margin: 0;
		flex-direction: column;
	}
`;

export const C1 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const Section1 = styled.div`
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		display: flex;
		justify-content: space-between;
	}
`;

export const NID = styled.div`
	margin: 0 0 27.5px 0;
`;

export const P = styled.p`
	font-size: ${(props) => props.theme.typography.size.small} !important;
`;

export const Name = styled(P)`
	color: ${(props) => props.theme.colors.font.primary.base} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	line-height: 24px;
	max-width: 190px;
`;

export const ID = styled(P)`
	font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	margin: 10px 0 0 0 !important;
`;

export const PlayWrapper = styled.div<{ playing: boolean }>`
	margin: 0 20px 0 0;
	svg {
		padding: ${(props) => (props.playing ? '0 0 0 4.25px' : '2.5px 0')} !important;
	}
	button {
		border-radius: 50% !important;
	}
`;

export const VolumeWrapper = styled.div`
	height: fit-content;
	width: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 0 0 20px 0;
		width: 100%;
	}
`;

export const V1 = styled.div`
	margin: 0 7.5px 0 0;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const VolumeBar = styled(RangeBar)`
	width: 100%;
`;

export const ProgressWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0 20px 0 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		position: relative;
		bottom: auto;
		flex-direction: column;
		margin: 0;
	}
`;

export const ProgressBar = styled(RangeBar)`
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 15px 0 0 0;
	}
`;

export const TimeWrapper = styled.div`
	display: flex;
	margin: 0 10px 0 0;
	min-width: 85px;
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;
