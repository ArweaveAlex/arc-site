import styled from 'styled-components';

export const PlaceholderWrapper = styled.div``;

export const PlaceholderContainer = styled.div``;

export const Placeholder = styled.div<{ rowHeight: number; rowMargin: number }>`
	height: ${(props) => `${props.rowHeight.toString()}px`};
	width: 100%;
	margin: ${(props) => `0 0 ${props.rowMargin.toString()}px 0`};
`;
