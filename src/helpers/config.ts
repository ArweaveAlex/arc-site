import { AccountAll } from "views/Account/AccountAll";
import { AccountCollection } from "views/Account/AccountCollection";
import { AccountContributions } from "views/Account/AccountContributions";
import { LibraryAll } from "views/Library/LibraryAll";
import { LibraryCollection } from "views/Library/LibraryCollection";

import { IURLView, PoolType } from "helpers/types";
import * as filters from "filters/pools";
import * as urls from "helpers/urls";
import { LANGUAGE } from "helpers/language";

export const APP = {
    key: "appVersion",
    version: "1.0.0"
}

export const TAGS = {
    keys: {
        alexPoolId: "Alex-Pool-Id",
        ansTitle: "Title",
        appType:"App-Type",
        artifactName: "Artifact-Name",
        artifactType: "Artifact-Type",
        associationId: "Association-Id",
        associationSequence: "Association-Sequence",
        collectionIds: "Bookmark-Ids-Tag",
        collectionSearch: "Alex-Bookmark-Search",
        dateCreated: "Date-Created",
        keywords: "Keywords",
        initialOwner: "Initial-Owner",
        poolId: "Pool-Id",
        profileImage: "Profile-Image",
        uploaderTxId: "Uploader-Tx-Id",
        contractSrc: "Contract-Src",
        mediaIds: "Media-Ids",
        timestamp: "Timestamp"
    },
    values: {
        defaultArtifactType: "Alex-Default",
        messagingArtifactType: "Alex-Messaging",
        webpageArtifactType: "Alex-Webpage",
        poolVersions: {
            "1.2": "Alex-Archiving-Pool-v1.2",
            "1.4": "Alex-Archiving-Pool-v1.4"
        },
        searchIndex: "Alex-Search-Index-v0"
    }
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
    collection: `${ASSET_SRC}/collection.svg`,
    collections: `${ASSET_SRC}/collections.svg`,
    bookmarkSelected: `${ASSET_SRC}/collection-selected.svg`,
    close: `${ASSET_SRC}/close.svg`,
    contributions: `${ASSET_SRC}/contributions.svg`,
    copy: `${ASSET_SRC}/copy.svg`,
    cycle: `${ASSET_SRC}/cycle.png`,
    data: `${ASSET_SRC}/data.svg`,
    disconnect: `${ASSET_SRC}/disconnect.svg`,
    dropdown: `${ASSET_SRC}/dropdown.svg`,
    faviconDark: `${ASSET_SRC}/favicon-dark.svg`,
    faviconLight: `${ASSET_SRC}/favicon-light.svg`,
    favorite: `${ASSET_SRC}/favorite.svg`,
    impressions: `${ASSET_SRC}/impressions.svg`,
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
    pool: `${ASSET_SRC}/pool.svg`,
    replies: `${ASSET_SRC}/replies.svg`,
    retweet: `${ASSET_SRC}/retweet.svg`,
    search: `${ASSET_SRC}/search.svg`,
    share: `${ASSET_SRC}/share.svg`,
    shareLink: `${ASSET_SRC}/share-link.svg`,
    siteLogo: `${ASSET_SRC}/site-logo.svg`,
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
    "ACCESS_PUBLIC_KEY",
    "SIGN_TRANSACTION",
    "DISPATCH"
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
        { index: 1, label: LANGUAGE.account.collections.title, icon: ASSETS.collections, disabled: false, url: urls.accountCollections, view: AccountCollection },
        { index: 2, label: LANGUAGE.account.contributions.title, icon: ASSETS.contributions, disabled: false, url: urls.accountContributions, view: AccountContributions }
    ],
    library: [
        { index: 0, label: LANGUAGE.library.all.title, icon: ASSETS.all, disabled: false, url: (id: string) => urls.libraryAll(id), view: LibraryAll },
        { index: 1, label: LANGUAGE.library.collections.title, icon: ASSETS.collections, disabled: false, url: (id: string) => urls.libraryCollections(id), view: LibraryCollection }
    ]
}

export const STORAGE = {
    none: "N/A"
}

export const PAGINATOR = 100;

export const CURSORS = {
    p1: "P1",
    end: "END"
}

export const MEDIA_TYPES = {
    mp4: "mp4",
    jpg: "jpg",
    jpeg: "jpeg",
    png: "png"
}

export const POOL_FILTERS = [
    {
        title: LANGUAGE.pools.gridTitles.mostContributed,
        fn: (data: PoolType[]) => filters.sortByMostContributed(data, null)
    },
    {
        title: LANGUAGE.pools.gridTitles.newest,
        fn: (data: PoolType[]) => filters.sortByNewest(data, null)
    },
    {
        title: LANGUAGE.pools.gridTitles.all,
        fn: (data: PoolType[]) => filters.sortByAll(data, null)
    }
]

export const FALLBACK_IMAGE = "8HqSqy_nNRSTPv-q-j7_iHGTp6lEA5K77TP4BPuXGyA";

export const SEARCH = {
    cursorPrefix: "searchCursor",
    idTerm: "`*",
    ownerTerm: "`%"
}

export const OPERATOR_LINK = "https://alex-operator-guide.arweave.dev/";