import { ARProvider } from "providers/ARProvider";

import { Header } from "navigation/header";
import { Footer } from "navigation/footer";

import { Routes } from "routes";

import { DOM } from "config";

export default function Root() {
  return (
    <ARProvider>
      <div id={DOM.loader} />
      <div id={DOM.modal} />
      <div id={DOM.notification} />
      <Header />
      <Routes />
      <Footer />
    </ARProvider>
  )
}