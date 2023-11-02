import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	min-height: 500px;
	padding: 60px 20px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt6.background};
`;

export const WrapperAlt1 = styled(Wrapper)`
	padding: 60px 20px 20px 20px;
	background: ${(props) => props.theme.colors.container.primary.background};
`;

export const WrapperAlt2 = styled(Wrapper)`
	background: ${(props) => props.theme.colors.container.alt2.background};
`;

export const WrapperAlt3 = styled(Wrapper)``;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	display: flex;
	max-width: ${STYLING.cutoffs.max};
	animation: ${open} ${fadeIn2};
	@media (max-width: calc(${STYLING.cutoffs.initial} + 50px)) {
		flex-direction: column;
	}
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: calc(${STYLING.cutoffs.initial} + 50px)) {
		max-width: none;
		margin: 40px 0 0 0;
	}
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 900px;
	margin: 0 auto;
`;

export const Header = styled.h2`
	font-size: clamp(24px, 2.75vw, 32px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary.alt11};
	text-align: center;
`;

export const HeaderAlt = styled(Header)`
	color: ${(props) => props.theme.colors.font.primary.alt2};
`;

export const Description = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt8};
	font-size: clamp(17px, 2.35vw, 22px);
	font-weight: ${(props) => props.theme.typography.weight.regular};
	line-height: 1.75;
	margin: 20px 0 40px 0;
	text-align: center;
	b,
	a {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: clamp(17px, 2.35vw, 22px);
		font-weight: ${(props) => props.theme.typography.weight.medium};
		line-height: 1.75;
		text-align: center;
	}
	a {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-decoration: underline;
		&:hover {
			color: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
`;

export const DescriptionAlt = styled(Description)`
	color: ${(props) => props.theme.colors.font.primary.base};
	b {
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const Footer = styled.div`
	color: ${(props) => props.theme.colors.font.primary.alt8};
	font-size: clamp(17px, 2.35vw, 22px);
	font-weight: ${(props) => props.theme.typography.weight.bold};
	line-height: 1.35;
	font-weight: 300;
	text-align: center;
	b {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: clamp(17px, 2.35vw, 22px);
		font-weight: ${(props) => props.theme.typography.weight.regular};
		line-height: 1.35;
		text-align: center;
	}
`;

export const FooterAlt = styled(Footer)`
	color: ${(props) => props.theme.colors.font.primary.base};
`;

export const Action = styled.div`
	margin: 20px auto 40px auto;
	span {
		font-size: ${(props) => props.theme.typography.size.base} !important;
	}
`;
