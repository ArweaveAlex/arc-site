import styled from 'styled-components/macro';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 20px 0 40px 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const CWrapper = styled.div`
	height: 202.5px;
	width: 47.5%;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		margin: 0 0 20px 0;
	}
`;

export const Header = styled.div`
	height: 50px;
	h2 {
		font-size: 32px;
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const Body = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.alt1};
	padding: 0 15px;
	animation: ${open} ${fadeIn2};
`;

export const Row = styled.div<{ isEnd: boolean }>`
	height: 50px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid
		${(props) => (props.isEnd ? props.theme.colors.border.alt3 : props.theme.colors.transparent)};
`;

export const InfoData = styled.div`
	p,
	span,
	a {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const Number = styled(InfoData)`
	p {
		color: ${(props) => props.theme.colors.font.primary.alt2};
	}
`;

export const Owner = styled(InfoData)`
	margin: 0 0 0 20px;
	a {
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const RecentOwner = styled(Owner)`
	margin: 0;
`;

export const Amount = styled(InfoData)`
	display: flex;
	margin: 0 0 0 auto;
	p,
	span {
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
	p {
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const Count = styled(Amount)``;

export const NoContributionsContainer = styled.div`
	height: 100%;
	width: 100%;
	p {
		margin: 15px 0 0 0;
		color: ${(props) => props.theme.colors.warning};
	}
`;
