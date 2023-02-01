import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	position: relative;
	label {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-width: none;
	}
`;

export const TextArea = styled.textarea<{
	disabled: boolean;
	invalid: boolean;
}>`
	height: 165px;
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	margin: 7.5px 0 0 0;
	border: 1px solid ${(props) => (props.invalid ? props.theme.colors.form.invalid.outline : props.theme.colors.form.border)};
	border-radius: ${STYLING.dimensions.borderRadiusField};
	&:focus {
		outline: 0;
		border: 1px solid ${(props) => (props.invalid ? props.theme.colors.form.invalid.outline : props.theme.colors.form.valid.outline)};
		box-shadow: 0 0 2px 1px ${(props) => (props.invalid ? props.theme.colors.form.invalid.shadow : props.theme.colors.form.valid.shadow)};
		transition: box-shadow, border 225ms ease-in-out;
	}
	&:disabled {
		background: ${(props) => props.theme.colors.form.disabled.background};
		color: ${(props) => props.theme.colors.form.disabled.label};
		box-shadow: none;
		border: 1px solid ${(props) => props.theme.colors.form.border};
	}
`;

export const ErrorContainer = styled.div`
	margin: 7.5px 0 0 0;
	height: 25px;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Error = styled.span`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	border-left: 3.5px solid ${(props) => props.theme.colors.font.primary.invalid};
	padding-left: 5px;
`;
