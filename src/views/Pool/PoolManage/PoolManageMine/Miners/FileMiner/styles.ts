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
	margin: 0 0 20px 0;
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
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
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
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
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
	margin: 40px 0 0 0;
	button {
		margin: 0 auto;
	}
`;
