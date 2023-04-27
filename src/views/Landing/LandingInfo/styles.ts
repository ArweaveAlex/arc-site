import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	background: ${(props) => props.theme.colors.container.alt7.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const WrapperAlt = styled(Wrapper)`
	background: ${(props) => props.theme.colors.container.primary.background};
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	margin: 0 auto;
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

export const HeaderWrapper = styled.div`
	margin: 20px 0 0 0;

	h2 {
		margin: 0 0 10px 0;
	}

	p,
	span {
		font-size: clamp(24px, 2.75vw, 32px);
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt8};
		line-height: 1.35;
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt2};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const HeaderWrapperAlt1 = styled(HeaderWrapper)`
	h2,
	p,
	span {
		text-align: right;
	}

	p,
	span {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
`;

export const SectionsWrapper = styled.div`
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 40px 0 0 0;
		flex-direction: column;
	}
`;

export const SectionAlt = styled(Section)`
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column-reverse;
	}
`;

export const Description = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	p,
	b {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: clamp(17px, 2.35vw, 22px);
		line-height: 1.5;
		font-weight: 300;
	}
	b {
		font-weight: ${(props) => props.theme.typography.weight.medium};
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

export const Action = styled.div`
	width: fit-content;
	margin: 0 auto 20px auto;
	span {
		font-size: ${(props) => props.theme.typography.size.base} !important;
	}
`;
