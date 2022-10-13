import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { ARProvider } from "@/providers/ARProvider";

import { Header } from "@/navigation/header";
import { Footer } from "@/navigation/footer";
import { View } from "@/wrappers/View";

import { ASSETS, DOM } from "@/config";
import { GlobalStyle } from "@/styles";
import { defaultTheme } from "@/themes";
import { LANGUAGE } from "@/language";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [faviconHref, setFaviconHref] = React.useState(ASSETS.faviconDark);

  const getFaviconPath = (darkNav = false) => {
    return darkNav ? ASSETS.faviconLight : ASSETS.faviconDark;
  };

  React.useEffect(() => {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
    setFaviconHref(getFaviconPath(mediaMatch.matches));
  })

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href={faviconHref} />
        <title>{LANGUAGE.companyTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={LANGUAGE.metaDescriptionContent} />
        <meta name="theme-color" content={defaultTheme.colors.container.alt1.background} />
      </Head>

      <ARProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Header />
          <div id={DOM.loader}></div>
          <div id={DOM.notification}></div>
          <div id={DOM.modal}></div>
          <View>
            <Component {...pageProps} />
          </View>
          <Footer />
        </ThemeProvider>
      </ARProvider>
    </>
  )
}
