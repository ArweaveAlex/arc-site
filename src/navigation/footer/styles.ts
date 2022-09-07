import styled from "styled-components";

import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 40vh;
    width: 100%;
    position: relative;
    background: ${props => props.theme.colors.navigation.footer.background};
    border-top: 1px solid ${(props) => props.theme.colors.border.secondary};
`;

export const Container = styled.div`
  height: 75%;
  width: 100%;
  position: absolute;
  max-width: ${STYLING.cutoffs.max};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 40px;
`;

export const FlexContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(max-width:  ${STYLING.cutoffs.secondary}) {
    height: 80%;
    flex-direction: column;
  }
`;

export const ContainerOne = styled.div`
  height: 100%;
  width: 40%;
  display: flex;

  @media(max-width: ${STYLING.cutoffs.secondary}) {
    height: auto;
    width: 57.5%;
  }
`;

export const ContainerTwo = styled.div`
  height: 100%;
  width: 30%;

  @media (max-width:  ${STYLING.cutoffs.secondary}) {
    height: auto;
    width: 100%;
    margin-top: 20px;
  }
`;

export const NavContainer = styled.div`
  height: 100%;
  width: 50%;

  @media(max-width:  ${STYLING.cutoffs.secondary}) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const NavContainerHeader = styled.p`
  font-weight: ${props => props.theme.typography.weight.medium};
  margin-bottom: 3.5px;
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled.a`
  margin-top: 10px;
  width: fit-content;
  &:hover{
    text-decoration: underline;
  }
`;

export const SocialPaths = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 13.5px 0 0 0;
`;

export const SocialLink = styled.a`
  margin: 0 20px 0 0;

  svg {
    width: 20px;
    fill: ${(props) => props.theme.colors.font.primary.active.base};
    &:hover {
      fill: ${(props) => props.theme.colors.font.primary.active.hover};
    }
  }
`;

export const ContainerC = styled.div`
  height: 10%;
  width: 100%;

  @media(max-width:  ${STYLING.cutoffs.secondary}) {
    height: auto;
    margin-top: 30px;
  }
`;

export const Copyright = styled.p`
  
`;