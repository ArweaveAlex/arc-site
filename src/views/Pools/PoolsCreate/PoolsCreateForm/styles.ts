import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const C1 = styled.div`
	height: 100%;
	width: calc(100% - 540px);
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const HeaderImageWrapper = styled.div``;

export const HeaderImage = styled.div<{ disabled: boolean }>`
	height: 350px;
	width: 100%;
	border: 1px dashed ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	}
	label {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		transition: background 0.05s;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		background: ${(props) => props.theme.colors.container.alt3.background};
		&:hover {
			background: ${(props) =>
				props.disabled ? props.theme.colors.container.primary.disabled : props.theme.colors.container.alt4.background};
		}
	}
	input {
		display: none;
	}
`;

export const OwnerInfoWrapper = styled.div`
	margin: 40px 0 0 0;
	span {
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		color: ${(props) => props.theme.colors.font.primary.alt4} !important;
	}
	p {
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.active.base} !important;
	}
`;

export const OwnerInfo = styled.div`
	padding: 20px 20px 1.5px 20px;
	margin: 0 0 20px 0;
`;

export const DataLine = styled.div`
	display: flex;
	align-items: center;
	margin: 0 0 20px 0;
`;

export const FormContainer = styled.div`
	height: 100%;
	width: 500px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Header = styled.div`
	margin: 0 0 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	padding: 20px 20px 1.5px 20px;
`;

export const TCheckbox = styled.div`
	display: flex;
	align-items: center;
	margin: 0 0 25px 0;
	span {
		display: block;
		margin: 0 10px 0 0;
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const KeywordsWrapper = styled.div``;

export const KeywordsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
`;

export const FlexField = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		margin: -15px 0 0 20px;
	}
`;

export const SubmitContainer = styled.div`
	margin: 20px 0 0 0;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		button {
			min-width: 0 !important;
			width: 100% !important;
		}
	}
`;

export const SuccessModal = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	h2,
	p {
		text-align: center;
	}
	p {
		margin: 20px 0 80px 0;
		line-height: 1.5;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const ModalDataLine = styled(DataLine)`
	margin: 40px 0 20px 0;
	span,
	p {
		margin: 0;
		line-height: 0;
		font-size: ${(props) => props.theme.typography.size.base} !important;
	}
	span {
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		color: ${(props) => props.theme.colors.font.primary.alt4} !important;
	}
	p {
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.active.base} !important;
	}
`;
