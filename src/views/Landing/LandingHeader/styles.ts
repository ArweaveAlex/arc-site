import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const HeaderWrapper = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		flex-direction: column;
	}
`;

export const FlexHeader = styled.div`
	width: calc(100% - 700px);
	display: flex;
	flex-direction: column;
	padding: 0px;
	p {
		font-size: clamp(24px, 2.75vw, 32px);
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt8};
		line-height: 1.5;
		margin: 10px 0 0 0;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: 100%;
		h1,
		p {
			text-align: center;
			max-width: 1000px;
			margin: 0 auto;
		}
		p {
			margin: 20px auto 0 auto;
		}
	}
`;

export const SubheaderWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 50px 0 0 0;
	p {
		font-size: clamp(18px, 2vw, 20px);
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		margin: 0;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		margin: 20px auto 40px auto;
	}
`;

export const SubheaderContainer = styled.div`
	p,
	a {
		font-size: clamp(14px, 2vw, 20px);
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
	p > a {
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const FlexSubheader = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const Logo = styled.div`
	margin: 2.5px 0 0 8.5px;
	svg {
		width: 85px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		svg {
			width: 65px;
			margin: 0 0 10px 0;
		}
	}
`;

export const GraphicWrapper = styled.div`
	margin: auto;
	width: 675px;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 675px;
		margin: -30px 0 -15px 50px;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: 100%;
		svg {
			height: 400px;
			width: 100%;
			margin: auto;
		}
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		svg {
			height: auto;
		}
	}
`;
