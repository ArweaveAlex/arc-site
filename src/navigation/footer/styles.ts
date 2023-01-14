import styled from "styled-components";

export const Wrapper = styled.footer`
    height: 50px;
    width: 100%;
    position: relative;
    z-index: 2;
    background: ${props => props.theme.colors.navigation.footer.background};
`;

export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  border-top: 1px solid ${(props) => props.theme.colors.border.alt1};
`;

export const Content = styled.p`
  color: ${(props) => props.theme.colors.font.primary.alt1};
  font-size: 13px;
`;