import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	min-height: 600px;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	background: ${(props) => props.theme.colors.container.alt2.background};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
	}
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px 50px 20px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: ${STYLING.cutoffs.max};
	animation: ${open} ${fadeIn2};
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0 0 0;
`;

export const Header = styled.h1`
	font-size: clamp(38px, 4.5vw, 62px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary.base};
	margin: 20px 0 0 0;
`;

export const Section = styled.div<{ even: boolean }>`
	min-height: 300px;
	width: 100%;
	display: flex;
	flex-direction: ${(props) => (props.even ? 'row' : 'row-reverse')};
	justify-content: space-between;
	margin: 50px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const Asset = styled.div`
	height: 300px;
	width: 45%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 20px 0 0 0;
	}
	svg {
		height: 300px;
		max-width: 100%;
	}
`;

export const StepWrapper = styled.div`
	width: 50%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const StepHeader = styled.p`
	font-size: clamp(24px, 3.5vw, 32px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary.alt2};
`;

export const StepDescription = styled.div`
	color: ${(props) => props.theme.colors.font.primary.base};
	font-size: clamp(17px, 2.35vw, 22px);
	line-height: 1.5;
	margin: 20px 0 0 0;
	max-width: 585px;
	b {
		color: ${(props) => props.theme.colors.font.primary.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: clamp(17px, 2.35vw, 22px);
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: clamp(17px, 2.35vw, 22px);
		text-decoration: underline;
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
