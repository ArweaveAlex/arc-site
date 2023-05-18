import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	position: relative;
	margin: 10px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const CMiner = styled.div`
	width: calc(100% - 300px);
	padding: 0 0 0 30px;
	animation: ${open} ${fadeIn2};
	margin: 0 0 0 auto;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		padding: 0;
		margin: 0;
	}
`;
