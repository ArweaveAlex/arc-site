import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const HeaderWrapper = styled.div`
	display: flex;
`;

export const FlexHeader = styled.div`
	width: 700px;
	display: flex;
	flex-direction: column;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-wrap: wrap;
	}
`;

export const SubheaderWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0 0 0;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		margin: 0;
		width: auto;
		min-width: 0;
	}
`;

export const SubheaderContainer = styled.div``;

export const FlexSubheader = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		justify-content: start;
	}
`;

export const Subheader1 = styled.p`
	font-size: 18px;
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const Logo = styled.div`
	margin: 0 0 0 7.5px;
	svg {
		width: 100px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0 0 0 5px;
		svg {
			width: 55px;
			padding: 2.5px 0 0 0;
		}
	}
`;

export const Subheader2 = styled.div`
	margin: 10px 0 0 auto;
	text-align: right;
	display: flex;
	align-items: center;
	p {
		font-size: 17px;
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		margin: 0;
		text-align: left;
		justify-content: start;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		p {
			font-size: ${(props) => props.theme.typography.size.xSmall};
		}
	}
`;

export const Link = styled.div`
	width: fit-content;
	a {
		font-size: 17px;
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		margin: 0;
		text-align: left;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		a {
			font-size: ${(props) => props.theme.typography.size.xSmall};
		}
	}
`;

export const GraphicWrapper = styled.div`
	margin: auto;
	width: calc(100% - 700px);
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
	}
	img {
		margin: auto;
	}
`;
