import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const ModalWrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const Header = styled.div`
	height: 30%;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 0 20px 0;
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
	max-width: ${STYLING.dimensions.formWidthMin};
	margin: 50px auto 0 auto;
`;

export const SubmitWrapper = styled.div`
	margin: 40px auto 15px auto;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
`;

export const SubheaderFlex = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const SubheaderContainer = styled.div`
	display: flex;
	margin: 10px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 0 0 7.5px 0;
	}
`;

export const Subheader1 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		color: ${(props) => props.theme.colors.font.primary.alt6};
	}
`;

export const Subheader2 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		max-width: 67.5%;
	}
`;

export const ID = styled(Subheader2)`
	display: flex;
	position: relative;
	p {
		margin: 0 7.5px 0 0;
	}
`;

export const IDCopied = styled.div`
	position: absolute;
	bottom: 100%;
	left: 100%;
	z-index: 5;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 3.5px 12.5px 2.5px 17.5px;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
	}
`;

export const Message = styled.div`
	width: 90%;
	margin: 20px auto;
	text-align: center;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;
