import { ArweaveProvider } from "providers/ArweaveProvider";

import { Header } from "navigation/header";
import { Footer } from "navigation/footer";

import { Routes } from "routes";

import { APP, DOM } from "helpers/config";

export default function Root() {

  // TODO - Workflow - Update App Version on main push
  if (!localStorage.getItem(APP.key) || localStorage.getItem(APP.key) !== APP.version) {
    localStorage.clear();
    localStorage.setItem(APP.key, APP.version);
    window.location.reload();
  }

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