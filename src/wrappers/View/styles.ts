import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.main<{ hasSubheader: boolean }>`
	min-height: calc(100vh - ${STYLING.dimensions.navHeight});
	width: 100%;
	margin: ${(props) =>
			props.hasSubheader ? `calc(${STYLING.dimensions.navHeight} * 2)` : STYLING.dimensions.navHeight}
		auto 0 auto;
`;
