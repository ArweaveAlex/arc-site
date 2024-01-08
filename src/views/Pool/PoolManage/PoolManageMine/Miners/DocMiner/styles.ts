import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';

export const Wrapper = styled.div`
	width: 100%;
	max-width: 90vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	animation: ${open} ${fadeIn2};
`;

export const Logo = styled.div`
	height: 150px;
	width: 150px;
	margin: 30px 0 0 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 50%;

	svg {
		height: 50%;
		width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const Title = styled.div`
	margin: 30px 0;
`;

export const Info = styled.p`
	text-align: center;
	line-height: 1.5;
	font-weight: ${(props) => props.theme.typography.weight.medium};
	margin: 0 0 30px 0;
	padding: 0 15px;
`;

export const Action = styled.div`
	margin: 0 0 30px 0;
`;

export const H2 = styled.h2`
	font-size: 28px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: ${(props) => props.theme.colors.font.primary.alt4};
`;
