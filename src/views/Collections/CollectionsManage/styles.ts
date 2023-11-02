import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	padding: 20px;
	width: 100%;
	animation: ${open} ${fadeIn2};
	margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	margin: 40px auto 0 auto;
	display: flex;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		margin: 40px auto 0 auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		flex-direction: column;
		margin: 40px auto 0 auto;
	}
`;

export const ArtifactsWrapper = styled.div`
	width: calc(100% - 470px);
	padding: 0 10px 0 0;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 0 0 40px 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: 100%;
		margin: 0 0 40px 0;
	}
`;

export const FormWrapper = styled.div`
	position: relative;
	width: 450px;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: 100%;
	}
`;

export const UploadingModalContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 20px;
`;

export const ModalBottomContainer = styled.div`
	position: relative;
	margin: 40px 0 0 0;
`;

export const ModalActionsContainer = styled.div`
	width: fit-content;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin: 0 auto;
`;

export const ModalLoadingContainer = styled.div`
	margin: 0 0 20px 0;
`;
