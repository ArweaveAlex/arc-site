import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.button`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.colors.button.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt2};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background: ${(props) => props.theme.colors.button.alt1.hover};
	}
	&:focus {
		background: ${(props) => props.theme.colors.button.alt1.hover};
	}
`;

export const Label = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		width: 30px;
		margin: 0 20px 0 0;
	}
	span {
		font-size: 24px;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const ModalWrapper = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px 20px 20px;
`;

export const Header = styled.div`
	height: 30%;
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: auto;
	}
`;

export const HeaderFlex = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: fit-content;
		flex-direction: column;
	}
`;

export const H2 = styled.h2`
	font-size: 28px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Header1 = styled(H2)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 0 0 20px 0;
	}
`;

export const BalanceWrapper = styled.div`
	display: flex;
	margin: 20px 0 0 0;
`;

export const AvailableBalance = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	line-height: 18px;
	white-space: nowrap;
	overflow: hidden;
`;

export const BalanceAmount = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-size: 18px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const ARTokens = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt4};
	font-size: 18px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const Form = styled.form`
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const FormWrapper = styled.div``;

export const FormContainer = styled.div`
	width: ${STYLING.dimensions.formWidthMin};
	margin: 50px auto 0 auto;
`;

export const SubmitWrapper = styled.div`
	margin: 15px auto;
	button {
		width: fit-content;
		margin: 0 auto;
	}
`;

export const RPWrapper = styled.div`
	width: fit-content;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 3.5px;
	margin: 0 auto;
	span,
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		line-height: 18px;
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt7};
	}
	p {
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	white-space: nowrap;
	overflow: hidden;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		gap: 10px;
	}
`;

export const Message = styled.div`
	width: 100%;
	margin: 12.5px auto 0 auto;
	text-align: center;
	p {
		font-size: 12px;
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;
