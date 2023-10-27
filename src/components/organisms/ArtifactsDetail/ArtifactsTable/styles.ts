import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const TypeContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	svg {
		height: fit-content;
		width: 15px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const TypeLabel = styled.div`
	height: 100%;
	width: calc(100% - 25px);
	width: 100%;
	padding: 0 10px 0 0;
	display: flex;
	align-items: center;
	position: relative;
`;

export const Icons = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	position: absolute;
	right: 0;
`;

export const Icon = styled.div`
	height: 100%;
	width: 30px;
	display: flex;
	justify-content: end;
	align-items: center;
	svg {
		width: 10px;
		margin: 3.5px 0 0 0;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const AssociationIcon = styled(Icon)`
	svg {
		width: 12.5px;
	}
`;

export const TradeIcon = styled(Icon)`
	right: 0;
	left: auto;
	svg {
		width: 10px;
	}
`;

export const LinkWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
`;

export const ALinkWrapper = styled.div`
	width: 75%;
	display: flex;
`;

export const ALink = styled.div`
	width: fit-content;
	max-width: calc(100% - 35px);
	display: flex;
	align-items: center;
	a,
	span,
	b {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	a {
		line-height: 18px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	span,
	b {
		color: ${(props) => props.theme.colors.font.primary.alt4};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const PLink = styled(ALink)`
	max-width: 100%;
`;

export const StampContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CheckboxContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const AWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const ActionsWrapper = styled.div``;

export const FilterWrapper = styled.div`
	display: flex;
	align-items: center;
	> * {
		&:not(:first-child) {
			margin: 0 0 0 15px;
		}
	}
	button {
		svg {
			height: 30px !important;
			width: 20px !important;
		}
	}
`;

export const FCWrapper = styled.div`
	height: 33.5px;
	width: fit-content;
	padding: 1.5px 12.5px 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-radius: 25px;
	background: ${(props) => props.theme.colors.container.alt4.background};
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		margin: 0 8.5px 0 0;
	}
	button {
		margin: 0;
		svg {
			height: 11.5px !important;
			width: 11.5px !important;
		}
	}
`;
