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
	background: ${(props) => props.theme.colors.container.alt7.background};
`;

export const WrapperAlt1 = styled(Wrapper)`
	background: ${(props) => props.theme.colors.container.alt6.background};
`;

export const WrapperAlt2 = styled(Wrapper)`
	background: ${(props) => props.theme.colors.container.alt2.background};
`;

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
	line-height: 1.5;
	margin: 20px 0 40px 0;
	text-align: center;
	b {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: clamp(17px, 2.35vw, 22px);
		font-weight: ${(props) => props.theme.typography.weight.bold};
		line-height: 1.5;
		text-align: center;
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
	margin: 40px auto 0 auto;
	span {
		font-size: ${(props) => props.theme.typography.size.base} !important;
	}
`;

export const ATWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt2.background};
	padding: 0 20px 80px 20px;
`;

export const ATHeader = styled.p`
	font-size: clamp(22px, 2.75vw, 32px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	line-height: 1.25;
	text-align: center;
	color: ${(props) => props.theme.colors.font.primary.base};
	margin: 0 0 30px 0;
`;

export const ATListContainer = styled.div`
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		display: flex;
	}
`;

export const ATList = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 0 auto 40px auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const ATContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 0 20px 0;
	svg {
		height: 50px;
		width: 50px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
	}
	p {
		margin: 12.5px 0 0 0;
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: clamp(14px, 1.5vw, 16px);
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		svg {
			height: 40px;
			width: 40px;
		}
	}
`;
