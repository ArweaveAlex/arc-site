import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Input = styled.input`
	appearance: none;
	margin: 0;
	padding: 0;
	background: ${(props) => (props.checked ? props.theme.colors.checkbox.active.background : props.theme.colors.checkbox.background)};
	border: 1px solid ${(props) => (props.checked ? props.theme.colors.checkbox.active.background : props.theme.colors.checkbox.border)};
	border-radius: ${STYLING.dimensions.borderRadiusField};
	height: 12.5px;
	width: 12.5px;

	&:hover {
		background: ${(props) => (props.checked ? props.theme.colors.checkbox.active.background : props.disabled ? props.theme.colors.checkbox.disabled : props.theme.colors.checkbox.hover)};
		cursor: pointer;
	}

	&:focus {
		background: ${(props) => (props.checked ? props.theme.colors.checkbox.active.background : props.disabled ? props.theme.colors.checkbox.disabled : props.theme.colors.checkbox.hover)};
		cursor: pointer;
	}

	&:disabled {
		background: ${(props) => props.theme.colors.checkbox.disabled};
		border: 1px solid ${(props) => props.theme.colors.checkbox.disabled};
		cursor: not-allowed;
	}
`;
