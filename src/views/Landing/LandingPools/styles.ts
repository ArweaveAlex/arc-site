import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';

export const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	animation: ${open} ${fadeIn2};
	padding: 0 0 20px 0;
`;

export const Action = styled.div`
	width: fit-content;
	margin: 40px auto 0 auto;
`;
