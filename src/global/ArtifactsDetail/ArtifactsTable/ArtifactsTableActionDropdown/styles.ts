import styled from 'styled-components/macro';

export const SubComponentContainer = styled.div`
	min-height: 141.5px;
	width: 600px;
	max-width: 90vw;
	position: absolute;
	top: 3.5px;
	right: 98.5%;
	z-index: 1;
	background: ${(props) => props.theme.colors.container.primary.background};
	&:after {
		content: ' ';
		position: absolute;
		top: 17.5px;
		left: 100%;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.transparent}
			${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.border.alt1};
	}
`;

export const PreviewContainer = styled(SubComponentContainer)``;

export const StampWidgetContainer = styled(SubComponentContainer)`
	min-height: 0;
	width: fit-content;
	top: 36.5px;
`;
