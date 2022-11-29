import { IURLView } from "types";

import { AccountAll } from "views/Account/AccountAll";
import { AccountBookmarks } from "views/Account/AccountBookmarks";
import { AccountContributions } from "views/Account/AccountContributions";
import { LibraryAll } from "views/Library/LibraryAll";
import { LibraryBookmarks } from "views/Library/LibraryBookmarks";

import * as urls from "urls";
import { LANGUAGE } from "language";

// Alex-Archiving-Pool-v1.2
export const TAGS = {
    keys: {
        appType:"App-Type",
        artifactName: "Artifact-Name",
        artifactType: "Artifact-Type",
        ansTitle: "Title",
        bookmarkIds: "Bookmark-Ids-Tag",
        bookmarkSearch: "Alex-Bookmark-Search",
        dateCreated: "Date-Created",
        keywords: "Keywords",
        initialOwner: "Initial-Owner",
        collectionId: "Pool-Id",
        uploaderTxId: "Uploader-Tx-Id",
        contractSrc: "Contract-Src"
    },
    values: {
        defaultArtifactType: "Alex-Default",
        messagingArtifactType: "Alex-Messaging",
        webpageArtifactType: "Alex-Webpage",
        poolv1: "Alex-Archiving-Pool-v1.2",
        poolv2: "Alex-Archiving-Pool-v1.15-Testing-Vince"
    }
}

export const APP = {
    locale: "en"
}

export const ASSET_SRC = "assets";

export const ASSETS = {
    all: `${ASSET_SRC}/all.svg`,
    artifact: `${ASSET_SRC}/artifact.svg`,
    artifactTypes: {
        default: `${ASSET_SRC}/artifact-types/webpage.svg`,
        messaging: `${ASSET_SRC}/artifact-types/messaging.svg`,
        webpage: `${ASSET_SRC}/artifact-types/webpage.svg`
    },
    bookmark: `${ASSET_SRC}/bookmark.svg`,
    bookmarks: `${ASSET_SRC}/bookmarks.svg`,
    bookmarkSelected: `${ASSET_SRC}/bookmark-selected.svg`,
    close: `${ASSET_SRC}/close.svg`,
    collection: `${ASSET_SRC}/collection.svg`,
    contributions: `${ASSET_SRC}/contributions.svg`,
    copy: `${ASSET_SRC}/copy.svg`,
    cycle: `${ASSET_SRC}/cycle.png`,
    data: `${ASSET_SRC}/data.svg`,
    disconnect: `${ASSET_SRC}/disconnect.svg`,
    dropdown: `${ASSET_SRC}/dropdown.svg`,
    faviconDark: `${ASSET_SRC}/favicon-dark.svg`,
    faviconLight: `${ASSET_SRC}/favicon-light.svg`,
    infoGraphic: `${ASSET_SRC}/info-graphic.png`,
    link: `${ASSET_SRC}/link.svg`,
    logo: `${ASSET_SRC}/logo.svg`,
    logoAlt: `${ASSET_SRC}/logo-alt.svg`,
    logoAltActive: `${ASSET_SRC}/logo-alt-active.svg`,
    logoAlt1: `${ASSET_SRC}/logo-alt-1.svg`,
    logoAlt2: `${ASSET_SRC}/logo-alt-2.svg`,
    menu: `${ASSET_SRC}/menu.svg`,
    mint: `${ASSET_SRC}/mint.svg`,
    owner: `${ASSET_SRC}/owner.svg`,
    share: `${ASSET_SRC}/share.svg`,
    shareLink: `${ASSET_SRC}/share-link.svg`,
    social: {
        discord: `${ASSET_SRC}/discord.svg`,
        twitter: `${ASSET_SRC}/twitter.svg`
    },
    user: `${ASSET_SRC}/user.svg`,
    wallets: {
        arconnect: `${ASSET_SRC}/arconnect-wallet-logo.png`
    }
}

export const AR_WALLETS = [
    { name: "arconnect", logo: ASSETS.wallets.arconnect }
]

export const WALLET_PERMISSIONS = [
    "ACCESS_ADDRESS",
    "ACCESS_ALL_ADDRESSES",
    "ACCESS_PUBLIC_KEY",
    "SIGN_TRANSACTION"
]

export const TAB_OPTIONS = {
    details: LANGUAGE.details,
    view: LANGUAGE.view
}

export const ARTIFACT_TABS = [
    {
        label: TAB_OPTIONS.view
    },
    {
        label: TAB_OPTIONS.details
    }
]

export const ARTIFACT_TYPES = {
    [TAGS.values.defaultArtifactType]: {
        label: LANGUAGE.default,
        icon: ASSETS.artifactTypes.default
    },
    [TAGS.values.messagingArtifactType]: {
        label: TAGS.values.messagingArtifactType,
        icon: ASSETS.artifactTypes.messaging
    },
    [TAGS.values.webpageArtifactType]: {
        label: TAGS.values.webpageArtifactType,
        icon: ASSETS.artifactTypes.webpage
    }
}

export const DOM = {
    loader: "loader-portal",
    modal: "modal-portal",
    notification: "notification-portal"
};

export const URLS: IURLView = {
    account: [
        { index: 0, label: LANGUAGE.account.all.title, icon: ASSETS.all, disabled: false, url: urls.accountAll, view: AccountAll },
        { index: 1, label: LANGUAGE.account.bookmarks.title, icon: ASSETS.bookmarks, disabled: false, url: urls.accountBookmarks, view: AccountBookmarks },
        { index: 2, label: LANGUAGE.account.contributions.title, icon: ASSETS.contributions, disabled: false, url: urls.accountContributions, view: AccountContributions }
    ],
    library: [
        { index: 0, label: LANGUAGE.library.all.title, icon: ASSETS.all, disabled: false, url: (id: string) => urls.libraryAll(id), view: LibraryAll },
        { index: 1, label: LANGUAGE.library.bookmarks.title, icon: ASSETS.bookmarks, disabled: false, url: (id: string) => urls.libraryBookmarks(id), view: LibraryBookmarks }
    ]
}

export const PAGINATOR = 100;
export const FALLBACK_IMAGE = "8HqSqy_nNRSTPv-q-j7_iHGTp6lEA5K77TP4BPuXGyA";

export const STORAGE = {
    none: "N/A",
    pending: "pending",
    txUpdate: "txUpdate"
}