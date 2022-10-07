import { IURLView } from "./types";

import { AccountAll } from "./views/Account/AccountAll";
import { AccountNew } from "./views/Account/AccountNew";
import { AccountFavorites } from "./views/Account/AccountFavorites";
import { AccountContributions } from "./views/Account/AccountContributions";

import * as urls from "./urls";
import { LANGUAGE } from "./language";

export const API_URI = process.env.API_URI || "http://localhost:3000";

if (!API_URI) {
    throw new Error(
        "Please define the API_URI environment variable inside .env"
    )
}

export const APP = {
    locale: "en"
}

export const ASSET_SRC = "/assets";

export const ASSETS = {
    close: `${ASSET_SRC}/close.svg`,
    copy: `${ASSET_SRC}/copy.svg`,
    cycle: `${ASSET_SRC}/cycle.png`,
    disconnect: `${ASSET_SRC}/disconnect.svg`,
    dropdown: `${ASSET_SRC}/dropdown.svg`,
    faviconDark: `${ASSET_SRC}/favicon-dark.svg`,
    faviconLight: `${ASSET_SRC}/favicon-light.svg`,
    infoGraphic: `${ASSET_SRC}/info-graphic.png`,
    logo: `${ASSET_SRC}/logo.svg`,
    logoAlt: `${ASSET_SRC}/logo-alt.svg`,
    logoAltActive: `${ASSET_SRC}/logo-alt-active.svg`,
    menu: `${ASSET_SRC}/menu.svg`,
    share: `${ASSET_SRC}/share.svg`,
    user: `${ASSET_SRC}/user.svg`,
}

export const DOM = {
    modal: "modal-portal"
};

export const URLS: IURLView = {
    account: [
        { index: 0, label: LANGUAGE.account.all.title, icon: "account-all.svg", disabled: false, url: urls.accountAll, view: AccountAll },
        { index: 1, label: LANGUAGE.account.new.title, icon: "account-new.svg", disabled: true, url: urls.accountNew, view: AccountNew },
        { index: 2, label: LANGUAGE.account.favorites.title, icon: "account-favorites.svg", disabled: true, url: urls.accountFavorites, view: AccountFavorites },
        { index: 2, label: LANGUAGE.account.contributions.title, icon: "account-contributions.svg", disabled: false, url: urls.accountContributions, view: AccountContributions }
    ]
}