import styled from "styled-components/macro";

export const Wrapper = styled.div`
	margin: 25px 0 0 0;
`;

export const LoadingContainer = styled.div`
	height: 50px;
	width: 22.5px;
	position: relative;
`;

export const NoContributionsContainer = styled.div`
	p {
		color: ${(props) => props.theme.colors.warning};
	}
`;
