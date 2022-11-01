import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { App } from "app";

import { GlobalStyle } from "app/styles";
import { defaultTheme } from "themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={defaultTheme}>
    <React.StrictMode>
      <HashRouter>
        <GlobalStyle />
        <App />
      </HashRouter>
    </React.StrictMode>
  </ThemeProvider>
);