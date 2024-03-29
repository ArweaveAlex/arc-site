import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	margin: 20px 0;
`;

export const TWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const CWrapper = styled.div`
	max-height: 202.5px;
	width: 47.5%;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		margin: 0 0 20px 0;
	}
`;

export const Header = styled.div`
	height: 50px;
	h2 {
		font-size: 24px;
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const Body = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	animation: ${open} ${fadeIn2};
	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.alt2};
		}
		&:last-child {
			border-bottom: none;
		}
	}
`;

export const BFull = styled(Body)``;

export const BWrapper = styled.div`
	padding: 0 15px;
`;

export const Row = styled.div`
	height: 50px;
	display: flex;
	align-items: center;
`;

export const InfoData = styled.div`
	p,
	span,
	a {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		line-height: 1.25;
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
	align-items: center;
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
	padding: 10px 0;
	p {
		color: ${(props) => props.theme.colors.warning};
	}
`;

export const VWrapper = styled.div`
	margin: 20px 0 0 0;
	button {
		margin: 0 0 0 auto;
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 0;
	}
`;
