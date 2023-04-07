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
	padding: 40px 0 0 0;
`;

export const Header = styled.h1`
	font-size: clamp(38px, 4.5vw, 62px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary.alt11};
	margin: 0 0 10px 0;
`;

export const Subheader1 = styled.div`
	margin: 30px 0;
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

export const Subheader2 = styled.p`
	font-size: clamp(18px, 2.5vw, 24px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: ${(props) => props.theme.colors.font.primary.alt8};
	text-align: center;
	line-height: 1.35;
`;

export const Logo = styled.div`
	margin: 50px 0;
	svg {
		height: 500px;
	}
`;
