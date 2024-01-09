import styled, { createGlobalStyle } from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const GlobalStyle = createGlobalStyle`
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

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    background: ${(props) => props.theme.colors.view.background};
  }

  * {
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
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
    background: ${(props) => props.theme.colors.view.background};
  }
  

  a {
    text-decoration: none;
  }

  h1 {
    font-size: ${(props) => props.theme.typography.size.h1};
    font-family: ${(props) => props.theme.typography.family.alt1};
    font-weight: ${(props) => props.theme.typography.weight.bold};
    color: ${(props) => props.theme.colors.font.primary.active.base};
    line-height: 1.25;
  }

  .h1-alt {
    color: ${(props) => props.theme.colors.font.primary.alt2};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.size.h2};
    font-family: ${(props) => props.theme.typography.family.alt1};
    font-weight: ${(props) => props.theme.typography.weight.bold};
    color: ${(props) => props.theme.colors.font.primary.active.base};
    line-height: 1.25;
  }

  .h2-alt-1 {
    color: ${(props) => props.theme.colors.font.primary.alt11};
  }

  .h2-alt-2 {
    color: ${(props) => props.theme.colors.font.primary.base};
  }

  .h2-alt-3 {
    color: ${(props) => props.theme.colors.font.primary.alt8};
  }

  h1, h2, h3, h4, h5, h6 {
    overflow-wrap: anywhere;
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
      cursor: default;
    }
  }

  button, select, li, a {
    transition: background .035s;
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
      cursor: default;
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

  .id-ref-140 {
    scroll-margin-top: 140px;
  }

  .view-wrapper {
    width: 100%;
    margin: 0 auto;
    animation: ${open} ${fadeIn2};
    padding: 20px;
  }

  .padding-wrapper {
    padding: 20px;
  }

  .max-cutoff {
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
  }

  .border-wrapper {
    background: ${(props) => props.theme.colors.container.primary.background};
    box-shadow: 0 3.5px 10px 0 ${(props) => props.theme.colors.shadow.primary};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
  }

  .border-wrapper-alt {
    background: ${(props) => props.theme.colors.container.alt3.background};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
  }

  .border-wrapper-alt2 {
    background: ${(props) => props.theme.colors.container.primary.background};
    box-shadow: 0 2.5px 5px 0 ${(props) => props.theme.colors.shadow.alt1};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
  }

  .wrapper-600 {
    min-height: 141.5px;
    width: ${STYLING.dimensions.rendererWrapper};
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;
    animation: ${open} ${fadeIn2};
    p {
      font-weight: ${(props) => props.theme.typography.weight.medium};
      text-align: center;
      line-height: 1.5;
    }
  }
  
  .wrapper-full {
    width: 100%;
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
    overflow: hidden;
  }
`;

export const RangeBar = styled.input.attrs({ type: 'range' })`
	border: none !important;
	padding: 0 !important;
	background: transparent !important;

	&::-webkit-slider-runnable-track {
		background: ${(props) => props.theme.colors.container.alt3.background};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
		border-radius: ${STYLING.dimensions.borderRadius};
		transitin: background 0.75s;
		&:hover {
			cursor: pointer;
			border: 1px solid ${(props) => props.theme.colors.border.alt2};
		}
	}

	&::-moz-range-track {
		height: 15px;
		background: ${(props) => props.theme.colors.container.alt3.background};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
		border-radius: ${STYLING.dimensions.borderRadius};
		&:hover {
			cursor: pointer;
			border: 1px solid ${(props) => props.theme.colors.border.alt2};
		}
	}

	&::-ms-track {
		background: ${(props) => props.theme.colors.container.alt3.background};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
		border-radius: ${STYLING.dimensions.borderRadius};
		&:hover {
			cursor: pointer;
			border: 1px solid ${(props) => props.theme.colors.border.alt2};
		}
	}

	&.custom-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background: ${(props) => props.theme.colors.button.alt1.background};
		cursor: pointer;
	}

	&.custom-range::-moz-range-thumb {
		-webkit-appearance: none;
		border: none !important;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background: ${(props) => props.theme.colors.button.alt1.background};
		cursor: pointer;
	}

	&.custom-range::-ms-thumb {
		-webkit-appearance: none;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background: ${(props) => props.theme.colors.button.alt1.background};
		cursor: pointer;
	}
`;
