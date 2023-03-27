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

export const HeaderContent = styled.div`
	position: absolute;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
	}
`;

export const HeaderContentFixed = styled.div`
	width: calc(100% - 40px);
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	background: ${(props) => props.theme.colors.container.primary.background};
	margin: 0 0 40px 0;
	position: fixed;
	z-index: 2;
	top: ${STYLING.dimensions.navHeight};
	left: 50%;
	transform: translate(-50%, 0);
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		position: relative;
		top: auto;
		left: auto;
		transform: translate(0, 0);
		margin: 0;
	}
`;

export const Header = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 20px;
	margin: 20px 0 0 0;
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
	font-weight: ${(props) => props.theme.typography.weight.regular};
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