import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	background: ${(props) => props.theme.colors.container.primary.background};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		padding: 10px 20px 0 20px;
	}
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px;
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
	max-width: 1190px;
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		text-align: center;
	}
`;

export const Subheader1 = styled.div`
	margin: 30px 0 40px 0;
	max-width: 1000px;
	p,
	span {
		font-size: clamp(24px, 2.75vw, 32px);
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt8};
		text-align: center;
		line-height: 1.35;
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt2};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const Logo = styled.div`
	svg {
		height: 400px;
		max-width: 85vw;
	}
`;

export const Subheader2 = styled.p`
	margin: 40px 0;
	font-size: clamp(18px, 2.5vw, 22px);
	font-family: ${(props) => props.theme.typography.family.primary};
	color: ${(props) => props.theme.colors.font.primary.alt8};
	text-align: center;
	line-height: 1.5;
	b {
		font-size: clamp(18px, 2.5vw, 24px);
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary.alt8};
		text-align: center;
		line-height: 1.35;
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
