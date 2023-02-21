import styled from "styled-components";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${STYLING.cutoffs.max};
  margin: 0 auto;
  animation: ${open} ${fadeIn2};
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${STYLING.cutoffs.max};
  margin: calc(${STYLING.dimensions.navHeight} + 20px) auto 0 auto;
  padding: 0 20px;
  @media (max-width: ${STYLING.cutoffs.initialWrapper}) {
    height: auto;
  }
`;

export const HeaderContent = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.colors.container.primary.background};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: ${STYLING.dimensions.borderRadiusWrapper};
  box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${open} ${fadeIn2};
  @media (max-width: ${STYLING.cutoffs.tablet}) {
    flex-direction: column;
    align-items: start;
    padding: 20px;
  }
`;

export const HeaderContainer = styled.div``;

export const FlexHeader = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${STYLING.cutoffs.tablet}) {
    flex-wrap: wrap;
  }
`;

export const H2 = styled.h2`
  font-size: 28px;
  line-height: 1.5;
  @media (max-width: ${STYLING.cutoffs.tablet}) {
    font-size: 24px;
  }
`;

export const Header1 = styled(H2)`
  color: ${(props) => props.theme.colors.font.primary.active.base};
  font-family: ${(props) => props.theme.typography.family.alt1};
  @media (max-width: ${STYLING.cutoffs.tablet}) {
    margin: 0 0 20px 0;
  }
`;
