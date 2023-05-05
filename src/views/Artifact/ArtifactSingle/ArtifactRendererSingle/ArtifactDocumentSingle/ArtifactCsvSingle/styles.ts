import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.dimensions.rendererWrapper}) {
        width: auto;
    }
`;

export const DetailWrapper = styled.div`
	height: 100%;
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	z-index: 3;
`;

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: ${STYLING.cutoffs.initial};
	}
`;

export const Th = styled.th`
	font-weight: bold;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 8px;
	text-align: left;
`;

export const Td = styled.td`
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 8px;
	text-align: left;
`;

export const Tr = styled.tr``;

export const Tbody = styled.tbody``;
