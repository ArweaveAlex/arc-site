import styled from 'styled-components';

import { RangeBar } from 'app/styles';
import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: ${STYLING.dimensions.rendererWrapper};
	max-width: 100%;
	margin: 0 auto;
	max-width: 90vw;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		height: auto;
	}
`;

export const Audio = styled.audio``;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	padding: 15px;
	position: relative;
`;

export const C1 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
	}
`;

export const Section1 = styled.div`
	@media (max-width: ${STYLING.cutoffs.secondary}) {
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
	color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	max-width: 190px;
`;

export const ID = styled(P)`
	font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	margin: 10px 0 0 0 !important;
`;

export const PlayWrapper = styled.div<{ playing: boolean }>`
	margin: 0 0 20px 0;
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
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 10px;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0 0 20px 0;
		width: 100%;
	}
`;

export const V1 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 0 0 7.5px 0;
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
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		width: 100%;
		position: relative;
		bottom: auto;
	}
`;

export const ProgressBar = styled(RangeBar)`
	width: 100%;
`;

export const TimeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 5px 0 0 0;
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;
