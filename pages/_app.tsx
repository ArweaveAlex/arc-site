import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ArjsProvider } from "arjs-react";
import { ThemeProvider } from "styled-components";

import { ARProvider } from "@/providers/ARProvider";

import { Header } from "@/navigation/header";
import { Footer } from "@/navigation/footer";
import { View } from "@/wrappers/View";

import { DOM } from "@/config";
import { GlobalStyle } from "@/styles";
import { defaultTheme } from "@/themes";
import { language } from "@/language";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [faviconHref, setFaviconHref] = React.useState("/assets/favicon-dark.svg");

  const getFaviconPath = (isDarkMode = false) => {
    return `/assets/favicon-${isDarkMode ? "light" : "dark"}.svg`;
  };

  React.useEffect(() => {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
    setFaviconHref(getFaviconPath(mediaMatch.matches));
  })

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href={faviconHref} />
        <title>{language.companyTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={language.metaDescriptionContent} />
        <meta name="theme-color" content={defaultTheme.colors.container.alt1.background} />
      </Head>

      <ARProvider>
        <ArjsProvider connectors={{ arconnect: true, arweave: true }}>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <Header />
            <div id={DOM.modal}></div>
            <View>
              <Component {...pageProps} />
            </View>
            <Footer />
          </ThemeProvider>
        </ArjsProvider>
      </ARProvider>
    </>
  )
}
