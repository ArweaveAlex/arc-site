import { ArweaveProvider } from "providers/ArweaveProvider";

import { Header } from "navigation/header";
import { Footer } from "navigation/footer";

import { Routes } from "routes";

import { DOM } from "helpers/config";

export default function Root() {
  return (
    <ArweaveProvider>
      <div id={DOM.loader} />
      <div id={DOM.modal} />
      <div id={DOM.notification} />
      <Header />
      <Routes />
      <Footer />
    </ArweaveProvider>
  )
}