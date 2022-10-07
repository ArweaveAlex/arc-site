import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  @media (max-width: ${STYLING.cutoffs.initial}) {
    max-width: none;
  }
`;

export const Input = styled.input<{ disabled: boolean; invalid: boolean }>`
  color: ${(props) => props.theme.colors.font.primary.active.base};
  font-size: 19px;
  font-weight: ${(props) => props.theme.typography.weight.medium};
  margin: 5px 0 0 0;
  border: 1px solid ${(props) => props.invalid 
    ? props.theme.colors.form.invalid.outline
    : props.theme.colors.form.border};
  &:focus {
    outline: 0;
    border: 1px solid
      ${(props) =>
    props.invalid
      ? props.theme.colors.form.invalid.outline
      : props.theme.colors.form.valid.outline};
    box-shadow: 0 0 2px 1px
      ${(props) =>
    props.invalid
      ? props.theme.colors.form.invalid.shadow
      : props.theme.colors.form.valid.shadow};
    transition: box-shadow, border 225ms ease-in-out;
  }
`;

export const EndTextContainer = styled.div`
  height: calc(${STYLING.dimensions.formHeight} - 7.5px);
  max-width: 100px;
  position: absolute;
  right: 47.5px;
  top: 39.5%;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) => props.theme.colors.form.background};
`;

export const EndText = styled.span`
  color: ${(props) => props.theme.colors.font.primary.alt4};
  font-size: 19px;
  font-weight: ${(props) => props.theme.typography.weight.regular};
  width: 100%;
`;

export const ErrorContainer = styled.div`
  height: 20px;
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
