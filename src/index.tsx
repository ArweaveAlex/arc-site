import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "app";

import { GlobalStyle } from "app/styles";
import { defaultTheme } from "config/themes";

import { store, persistor } from "redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <React.StrictMode>
          <HashRouter>
            <GlobalStyle />
            <App />
          </HashRouter>
        </React.StrictMode>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);