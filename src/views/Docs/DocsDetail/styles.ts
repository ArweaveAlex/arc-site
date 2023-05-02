import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;
