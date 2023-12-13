import styled from 'styled-components';

export const Wrapper = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		line-height: 1.5;
		br {
			content: ' ';
			display: block;
			margin: 0 0 20px 0;
		}
	}
`;
