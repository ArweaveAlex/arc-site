import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
	padding: 20px;
	animation: ${open} ${fadeIn2};
`;

export const FlexWrapper = styled.div`
	display: flex;
`;

export const ArtifactWrapper = styled.div`
	width: 100%;
	margin: 20px 0 0 0;
`;

export const MessageContainer = styled.div`
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
	position: relative;
	p {
		position: absolute;
		top: 20px;
		left: 20px;
	}
`;
