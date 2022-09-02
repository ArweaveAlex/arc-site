import "@/styles/global.css";

import "@fontsource/righteous";
import "@fontsource/lato";
import "@fontsource/lato/100.css";
import "@fontsource/lato/900.css";

import 'react-loading-skeleton/dist/skeleton.css'

import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";

import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {/* @ts-ignore */}
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <NextNProgress color="#F6A646" height={6} key="progress-bar" />
      <Component {...pageProps} />
    </AnimatePresence>
    <Toaster />
  </>
);

export default MyApp;
