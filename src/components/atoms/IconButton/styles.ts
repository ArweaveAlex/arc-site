import styled from "styled-components";

export const Wrapper = styled.button<{ sm: boolean | undefined }>`
  height: auto;
  width: ${(props) => props.sm ? "15px" : "17.5px"};
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;

  svg {
    height: 100%;
    width: 100%;
    fill: ${(props) => props.theme.colors.icon.inactive};
    
    &:hover {
      cursor: pointer;
      opacity: 0.75;
    }
  }
`;
