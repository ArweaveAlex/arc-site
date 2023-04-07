import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	min-height: 600px;
	width: 100%;
	padding: 20px;
	margin: 0 auto;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	max-width: ${STYLING.cutoffs.max};
	animation: ${open} ${fadeIn2};
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 0 0 auto;
`;

export const Header = styled.h1`
	font-size: clamp(34px, 4.25vw, 52px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	line-height: 1.35;
	text-align: center;
	color: ${(props) => props.theme.colors.font.primary.alt11};
	margin: 20px 0 0 0;
`;

export const SectionsWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 40px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const Section = styled.div`
	width: 47.5%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Asset = styled.div`
	height: 300px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		height: 300px;
		max-width: 100%;
	}
`;

export const Description = styled.div`
	margin: 40px 0;
	p,
	b {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: clamp(17px, 2.35vw, 22px);
		line-height: 1.35;
		font-weight: 300;
	}
	b {
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
