import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	animation: ${open} ${fadeIn2};
`;

export const WalletDropdown = styled.ul`
	width: 350px;
	max-width: 90vw;
	padding: 20px 0 10px 0;
	position: absolute;
	top: 58.5px;
	right: 18.5px;
	z-index: 10;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		right: auto;
		left: 17.5px;
		top: 67.5px;
	}
`;

export const DHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 15px 20px 15px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const DHeader = styled.div`
	margin: 0 0 0 10px;
	p {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		margin: 0 0 5px 0;
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
	}
`;

export const DBodyWrapper = styled.ul`
	width: 100%;
	padding: 10px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	li {
		text-align: center;
		height: 37.5px;
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
		border: 1px solid transparent;
		padding: 0 15px;
		transition: all 0.05s;
		&:hover {
			background: ${(props) => props.theme.colors.button.alt1.hover};
			color: ${(props) => props.theme.colors.button.alt1.label};
		}
	}
`;

export const DFooterWrapper = styled(DBodyWrapper)`
	padding: 10px 0 0 0;
	border-bottom: none;
`;

export const AvatarWrapper = styled.div`
	height: 60px;
	width: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1.5px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 50%;
	svg {
		height: 32.5px;
		width: 32.5px;
		stroke: ${(props) => props.theme.colors.icon.alt1.fill};
	}
`;

export const Avatar = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50%;
`;
