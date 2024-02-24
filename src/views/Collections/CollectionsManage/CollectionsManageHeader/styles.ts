import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const HeaderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div``;

export const HeaderContentFixed = styled.div`
	width: 100%;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	margin: 0 auto;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: 100%;
	}
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const H2 = styled.h2`
	font-size: 28px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Header1 = styled(H2)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
`;

export const Actions = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 20px 0 0 0;
		flex-wrap: wrap;
		gap: 20px;
	}
`;

export const Action = styled.div`
	margin: 0 0 0 20px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
`;

export const ModalContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 0 20px 0;
	overflow: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
`;
