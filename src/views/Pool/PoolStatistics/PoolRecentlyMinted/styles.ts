import styled from "styled-components";

import { STYLING } from "helpers/styling";
import { loadingSlide } from "helpers/animations";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  h2 {
    font-size: 32px;
    font-family: ${(props) => props.theme.typography.family.alt1};
    color: ${(props) => props.theme.colors.font.primary.alt4};
  }
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0 0;
  > * {
    flex: 1 1 190px;
    margin: 0 21.5px 20px 0px;
  }
`;

export const Icon = styled.div`
  height: 72.5%;
  width: 96.5%;
  position: absolute;
  top: 37.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.container.alt1.background};
  svg {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: ${(props) => props.theme.colors.font.primary.base};
  }
  @media (max-width: ${STYLING.cutoffs.initial}) {
    svg {
      width: 37.5%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: ${(props) => props.theme.colors.font.primary.base};
    }
  }
`;

export const TypeLabel = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1;
  p {
    font-size: 12px;
    color: ${(props) => props.theme.colors.font.primary.base};
    font-weight: ${(props) => props.theme.typography.weight.medium};
  }
`;

export const Info = styled.div`
  height: 20.5%;
  width: 96.5%;
  position: absolute;
  top: 86.05%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

export const InfoTitle = styled.div`
  padding: 7.5px;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: ${(props) => props.theme.typography.size.xSmall};
    line-height: 18px;
    color: ${(props) => props.theme.colors.font.primary.alt4};
  }
`;

export const NLWrapper = styled.div`
  height: 325px;
  min-width: 250px;
  width: 290px;
  max-width: 250px;
`;

export const NodeWrapper = styled.div`
  height: calc(100% - 15px);
  width: 100%;
  background: ${(props) => props.theme.colors.container.primary.background};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: ${STYLING.dimensions.borderRadiusWrapper};
  position: relative;
  &:hover {
    &:hover ${Icon} {
      background: ${(props) => props.theme.colors.container.alt2.background};
    }
  }
  a {
    height: 100%;
    width: 100%;
    display: block;
  }
`;

export const ALinkNT = styled.div`
  height: 15px;
  width: 100%;
  margin: 10px 0 0 0;
  display: flex;
  align-items: center;
  a {
    text-decoration: none !important;
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-size: 13px;
    &:hover {
      color: ${(props) => props.theme.colors.font.primary.active.hover};
    }
  }
`;

export const Placeholder = styled.div`
  height: 325px;
  min-width: 250px;
  width: 290px;
  max-width: 250px;
  position: relative;
  background: linear-gradient(
      to right,
      ${(props) => props.theme.colors.table.placeholder.backgroundStart},
      ${(props) => props.theme.colors.table.placeholder.backgroundSlide} 50%,
      ${(props) => props.theme.colors.table.placeholder.backgroundEnd} 80%
    ),
    ${(props) => props.theme.colors.table.placeholder.background};
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: ${loadingSlide} 1.25s infinite;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const NoArtifactsContainer = styled.div`
  height: 100%;
  width: 100%;
  p {
    color: ${(props) => props.theme.colors.warning};
  }
`;
