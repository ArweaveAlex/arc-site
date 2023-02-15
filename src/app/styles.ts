import { createGlobalStyle } from 'styled-components';

import FiraSansRegular from 'assets/fonts/FiraSans-Regular.ttf';
import FiraSansMedium from 'assets/fonts/FiraSans-Medium.ttf';
import FiraSansBold from 'assets/fonts/FiraSans-Medium.ttf';

import PTSerifRegular from 'assets/fonts/PTSerif-Regular.ttf';
import PTSerifBold from 'assets/fonts/PTSerif-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Fira Sans';
    src: url(${FiraSansRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Fira Sans';
    src: url(${FiraSansMedium}) format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Fira Sans';
    src: url(${FiraSansBold}) format('truetype');
    font-weight: 600;
  }

  @font-face {
    font-family: 'PT Serif';
    src: url(${PTSerifRegular}) format('truetype');
  }

  @font-face {
    font-family: 'PT Serif';
    src: url(${PTSerifBold}) format('truetype');
    font-weight: 500;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    background: ${(props) => props.theme.colors.view.background};
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }

  html, body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    font-family: ${(props) => props.theme.typography.family.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
  }

  h1 {
    font-size: ${(props) => props.theme.typography.size.h1};
    font-family: ${(props) => props.theme.typography.family.alt1};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.size.h2};
  }

  b {
    font-weight: ${(props) => props.theme.typography.weight.medium};
  }
  
  p, span, button, a, b, li, input, textarea {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.small};
    color: ${(props) => props.theme.colors.font.primary.alt1};
  }

  button {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-weight: ${(props) => props.theme.typography.weight.medium};
  }

  a {
    color: ${(props) => props.theme.colors.font.primary.active.base};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1.215px;
    }
    &:focus {
      text-decoration: underline;
    }
  }
  
  button {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  input, textarea {
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: ${(props) => props.theme.colors.form.background};
    border: 1px solid ${(props) => props.theme.colors.form.border};
    color: ${(props) => props.theme.colors.font.primary.alt1};
    margin: 0;
    padding: 10px;
    &:disabled {
      cursor: not-allowed;
    }
  }

  input {
    padding: 10px 15px;
  }

  input[type=number]::-webkit-inner-spin-button {
    opacity: 1;
  }

  textarea {
    resize: none;
    height: 170px;
  }

`;
