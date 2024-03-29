import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const FormContainer = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		position: relative;
	}
`;

export const Header = styled.div`
	margin: 0 0 20px 0;
	p {
		font-size: clamp(18px, 20px, 22px);
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const FormContent = styled.div`
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-height: none;
		position: relative;
		width: 100%;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		position: relative;
		max-height: none;
		position: relative;
		width: 100%;
	}
`;

export const Form = styled.form`
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		margin: 0;
	}
`;

export const Fields = styled.div`
	padding: 20px 20px 0 20px;
`;

export const Description = styled.div`
	margin: 20px 0 0 0;
`;

export const SubmitContainer = styled.div`
	width: fit-content;
	margin: 20px 0 0 auto;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	overflow: hidden;
`;
