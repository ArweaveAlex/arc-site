import styled from "styled-components";

export const Wrapper = styled.div``;

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
