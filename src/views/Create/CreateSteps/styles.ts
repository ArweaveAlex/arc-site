import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	min-height: 500px;
	margin: 0 auto;
	padding: 20px 0;
	background: ${(props) => props.theme.colors.container.alt2.background};
`;

export const HeaderWrapper = styled.div`
	text-align: center;
	margin: 20px 0 0 0;
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 40px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const StepWrapper = styled.div`
	max-width: 100%;
	margin: 0 0 20px 0;
`;

export const StepHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 7.5px;
	p,
	span {
		font-size: clamp(24px, 3.5vw, 32px);
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt2};
	}
	p {
		color: ${(props) => props.theme.colors.font.primary.alt10};
	}
`;

export const StepDescription = styled.div`
	color: ${(props) => props.theme.colors.font.primary.base};
	font-size: clamp(17px, 2.35vw, 22px);
	text-align: center;
	line-height: 1.5;
	margin: 20px 0 0 0;
	max-width: 1000px;
	b {
		color: ${(props) => props.theme.colors.font.primary.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: clamp(17px, 2.35vw, 22px);
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt2};
		font-size: clamp(17px, 2.35vw, 22px);
	}
	a {
		color: ${(props) => props.theme.colors.font.primary.alt2};
		font-size: clamp(17px, 2.35vw, 22px);
		text-decoration: underline;
		&:hover {
			color: ${(props) => props.theme.colors.font.primary.alt3};
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-width: 100%;
	}
`;

export const Action = styled.div`
	width: fit-content;
	margin: 60px auto 0 auto;
	span {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		overflow: visible !important;
	}
`;
