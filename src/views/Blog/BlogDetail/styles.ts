import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	max-width: 900px;
	margin: 0 auto 20px auto;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	h2 {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: start;
		h2 {
			margin: 0 0 10px 0;
		}
	}
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;
