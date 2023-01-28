import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";
import { open, fadeIn2 } from "helpers/animations";

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	padding: 20px;
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	animation: ${open} ${fadeIn2};
`;
