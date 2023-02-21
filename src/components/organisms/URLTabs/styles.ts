import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const ListHeader = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
`;

export const List = styled.ol`
	padding: 0 20px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
`;

export const Content = styled.div`
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
`;

export const Tab = styled.li`
	margin: 0 20px 20px 0;
`;

export const View = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	padding: 20px;
`;
