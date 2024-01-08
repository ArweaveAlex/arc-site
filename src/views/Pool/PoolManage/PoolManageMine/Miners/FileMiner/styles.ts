import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	input {
		display: none;
	}
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: 0 0 20px 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const DataWrapper = styled.div`
	display: flex;
`;

export const DataTitle = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;

export const Data = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const Actions = styled.div`
	display: flex;
	button {
		margin: 0 0 0 20px;
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 20px 0 0 0;
		button {
			margin: 0 20px 0 0;
		}
	}
`;

export const H2 = styled.h2`
	font-size: 28px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: ${(props) => props.theme.colors.font.primary.alt4};
`;

export const EWrapper = styled.div`
	width: 100%;
	max-width: 90vw;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	animation: ${open} ${fadeIn2};
`;

export const ELogo = styled.div`
	height: 150px;
	width: 150px;
	margin: 30px 0 0 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 50%;

	svg {
		height: 50%;
		width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const ETitle = styled.div`
	margin: 30px 0;
`;

export const EInfo = styled.p`
	margin: 0 0 30px 0;
`;

export const EAction = styled.div`
	margin: 0 0 30px 0;
`;

export const MWrapper = styled.div`
	width: 100%;
`;

export const MHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const MHeader = styled.div`
	overflow-wrap: anywhere;
	span,
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
	p {
		margin: 10px 0 0 0;
		line-height: 1.5;
		overflow-wrap: anywhere;
		color: ${(props) => props.theme.colors.font.primary.active.base};
		text-overflow: ellipsis;
	}
`;

export const MBodyWrapper = styled.div`
	margin: 20px 0 0 0;
`;

export const FieldsWrapper = styled.div`
	padding: 20px 20px 0 20px;
	margin: 0 0 20px 0;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	position: relative;
`;

export const FieldsHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 0 0 20px 0;
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const RemoveAction = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
`;

export const MFooterWrapper = styled.div`
	width: fit-content;
	margin: 40px 0 0 auto;
`;

export const UploadingModalContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 20px;
	h2 {
		font-size: 24px;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		margin: 0 0 10px 0;
	}
`;

export const Message = styled.div`
	margin: 10px 0 0 0;
	p {
		line-height: 1.5;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const ModalBottomContainer = styled.div`
	position: relative;
	margin: 10px auto 0 auto;
`;

export const MAction = styled.div`
	margin: 10px 0 0 0;
`;

export const ModalLoadingContainer = styled.div``;

export const AContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0 0 0;
	animation: ${open} ${fadeIn2};
`;

export const AProgress = styled.div<{ percentage: string }>`
	height: 33.5px;
	width: 300px;
	max-width: 67.5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt5.background};
	border-radius: 20px;
	overflow: hidden;
	position: relative;
	span {
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		line-height: 1.25;
		position: relative;
		z-index: 1;
		display: block;
		text-align: center;
	}
	> div {
		height: 100%;
		position: absolute;
		left: 0;
		width: ${(props) => props.percentage}%;
		background: ${(props) => props.theme.colors.container.alt8.background};
		transition: width 0.15s ease;
	}
`;

export const APercentage = styled.span`
	width: 20px;
`;

export const GFlexWrapper = styled.div`
	margin: 40px 0 0 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
	button {
		width: 75%;
		min-width: 150px;
		border-radius: ${STYLING.dimensions.borderRadius} !important;
		span {
			font-size: ${(props) => props.theme.typography.size.small};
		}
	}
`;

export const GAddWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
	button {
		margin: 40px 0 0 auto;
	}
`;
