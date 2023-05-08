import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Content = styled.div`
	min-height: 100%;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	animation: ${open} ${fadeIn2};
`;

export const Header = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
	justify-content: space-between;
    align-items: center;
    padding 0 0 0 2.5px;
`;

export const Header1 = styled.h2`
	font-size: 20px;
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const Actions = styled.div`
	display: flex;
`;

export const NextAction = styled.div`
	height: fit-content;
	width: fit-content;
	margin: 0;
	text-align: left;
	display: flex;
`;

export const PrevAction = styled(NextAction)`
	margin: 0 10px 0 0;
`;

export const Body = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	overflow: auto;
	.carousel-root {
		height: 100%;
	}
	.carousel.carousel-slider {
		overflow: visible;
		height: 100%;
	}
	.carousel .slider-wrapper {
		height: 100%;
		overflow-x: hidden;
		overflow-y: visible;
	}
	.control-dots {
		top: -31.5px;
		right: 0;
		height: fit-content;
		width: fit-content;
		margin: 0;
		text-align: left;
		display: flex;
	}
	.slider {
		height: 100%;
	}
	li {
		height: auto !important;
		padding: 0 !important;
		&:hover {
			cursor: default;
			background: transparent !important;
		}
	}
`;
