import { AccountAll } from 'views/Account/AccountAll';
import { AccountCollections } from 'views/Account/AccountCollections';
import { AccountBookmarks } from 'views/Account/AccountBookmarks';
import { AccountContributions } from 'views/Account/AccountContributions';
import { LibraryAll } from 'views/Library/LibraryAll';
import { LibraryBookmarks } from 'views/Library/LibraryBookmarks';

import { IURLView, PoolType } from 'helpers/types';
import * as filters from 'filters/pools';
import * as urls from 'helpers/urls';
import { LANGUAGE } from 'helpers/language';

export const APP = {
	key: 'appVersion',
	version: '1.0.5',
};

export const TAGS = {
	keys: {
		alexPoolId: 'Alex-Pool-Id',
		ansTitle: 'Title',
		ansDescription: 'Description',
		ansTopic: 'Topic',
		ansType: 'Type',
		ansImplements: 'Implements',
		appType: 'App-Type',
		artifactName: 'Artifact-Name',
		artifactType: 'Artifact-Type',
		associationId: 'Association-Id',
		associationSequence: 'Association-Sequence',
		childAssets: 'Child-Assets',
		bookmarkIds: 'Bookmark-Ids-Tag',
		bookmarkSearch: 'Alex-Bookmark-Search',
		dateCreated: 'Date-Created',
		keywords: 'Keywords',
		initialOwner: 'Initial-Owner',
		poolId: 'Pool-Id',
		profileImage: 'Profile-Image',
		uploaderTxId: 'Uploader-Tx-Id',
		contractSrc: 'Contract-Src',
		mediaIds: 'Media-Ids',
		timestamp: 'Timestamp',
		collectionName: 'Collection-Name',
		collectionDescription: 'Collection-Description',
	},
	values: {
		defaultArtifactType: 'Alex-Default',
		messagingArtifactType: 'Alex-Messaging',
		nostrEventArtifactType: 'Alex-Nostr-Event',
		redditThreadArtifactType: 'Alex-Reddit-Thread',
		webpageArtifactType: 'Alex-Webpage',
		poolVersions: {
			'1.2': 'Alex-Archiving-Pool-v1.2',
			'1.4': 'Alex-Archiving-Pool-v1.4',
		},
		searchIndex: 'Alex-Search-Index-v0',
		collectionAppType: 'Alex-Collection-v0',
		ansVersion: 'ANS-110',
		ansType: 'token',
	},
};

export const ASSET_SRC = 'assets';

export const ASSETS = {
	all: `${ASSET_SRC}/all.svg`,
	arrowNext: `${ASSET_SRC}/arrow-next.svg`,
	arrowPrevious: `${ASSET_SRC}/arrow-previous.svg`,
	artifact: `${ASSET_SRC}/artifact.svg`,
	artifactTypes: {
		default: `${ASSET_SRC}/artifact-types/webpage.svg`,
		messaging: `${ASSET_SRC}/artifact-types/twitter.svg`,
		nostrEvent: `${ASSET_SRC}/artifact-types/nostr.svg`,
		redditThread: `${ASSET_SRC}/artifact-types/reddit-thread.svg`,
		webpage: `${ASSET_SRC}/artifact-types/webpage.svg`,
	},
	association: `${ASSET_SRC}/association.svg`,
	bookmark: `${ASSET_SRC}/bookmark.svg`,
	bookmarkSelected: `${ASSET_SRC}/bookmark-selected.svg`,
	bookmarks: `${ASSET_SRC}/bookmarks.svg`,
	close: `${ASSET_SRC}/close.svg`,
	collections: `${ASSET_SRC}/collections.svg`,
	contributions: `${ASSET_SRC}/contributions.svg`,
	copy: `${ASSET_SRC}/copy.svg`,
	cycle: `${ASSET_SRC}/cycle.png`,
	data: `${ASSET_SRC}/data.svg`,
	disconnect: `${ASSET_SRC}/disconnect.svg`,
	dropdown: `${ASSET_SRC}/dropdown.svg`,
	favorite: `${ASSET_SRC}/favorite.svg`,
	impressions: `${ASSET_SRC}/impressions.svg`,
	infoGraphic: `${ASSET_SRC}/info-graphic.png`,
	link: `${ASSET_SRC}/link.svg`,
	logo: `${ASSET_SRC}/logo.svg`,
	logoAlt: `${ASSET_SRC}/logo-alt.svg`,
	logoAltActive: `${ASSET_SRC}/logo-alt-active.svg`,
	logoAlt1: `${ASSET_SRC}/logo-alt-1.svg`,
	logoAlt2: `${ASSET_SRC}/logo-alt-2.svg`,
	media: `${ASSET_SRC}/media.svg`,
	menu: `${ASSET_SRC}/menu.svg`,
	menuAction: `${ASSET_SRC}/action-menu.svg`,
	mint: `${ASSET_SRC}/mint.svg`,
	newTab: `${ASSET_SRC}/new-tab.svg`,
	owner: `${ASSET_SRC}/owner.svg`,
	pool: `${ASSET_SRC}/pool.svg`,
	preview: `${ASSET_SRC}/preview.svg`,
	replies: `${ASSET_SRC}/replies.svg`,
	retweet: `${ASSET_SRC}/retweet.svg`,
	search: `${ASSET_SRC}/search.svg`,
	share: `${ASSET_SRC}/share.svg`,
	shareLink: `${ASSET_SRC}/share-link.svg`,
	siteLogo: `${ASSET_SRC}/site-logo.svg`,
	social: {
		discord: `${ASSET_SRC}/discord.svg`,
		twitter: `${ASSET_SRC}/twitter.svg`,
	},
	stamp: {
		default: `${ASSET_SRC}/star.svg`,
		super: `${ASSET_SRC}/star.svg`,
		vouched: `${ASSET_SRC}/star.svg`,
	},
	star: `${ASSET_SRC}/star.svg`,
	user: `${ASSET_SRC}/user.svg`,
	wallets: {
		arconnect: `${ASSET_SRC}/arconnect-wallet-logo.png`,
	},
};

export const AR_WALLETS = [{ name: 'arconnect', logo: ASSETS.wallets.arconnect }];

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH'];

export const TAB_OPTIONS = {
	details: LANGUAGE.details,
	view: LANGUAGE.view,
};

export const ARTIFACT_TABS = [
	{
		label: TAB_OPTIONS.view,
	},
	{
		label: TAB_OPTIONS.details,
	},
];

export const ARTIFACT_TYPES = {
	[TAGS.values.defaultArtifactType]: {
		label: LANGUAGE.default,
		icon: ASSETS.artifactTypes.default,
	},
	[TAGS.values.messagingArtifactType]: {
		label: TAGS.values.messagingArtifactType,
		icon: ASSETS.artifactTypes.messaging,
	},
	[TAGS.values.nostrEventArtifactType]: {
		label: TAGS.values.nostrEventArtifactType,
		icon: ASSETS.artifactTypes.nostrEvent,
	},
	[TAGS.values.redditThreadArtifactType]: {
		label: TAGS.values.redditThreadArtifactType,
		icon: ASSETS.artifactTypes.redditThread,
	},
	[TAGS.values.webpageArtifactType]: {
		label: TAGS.values.webpageArtifactType,
		icon: ASSETS.artifactTypes.webpage,
	},
};

export const DOM = {
	loader: 'loader',
	modal: 'modal',
	notification: 'notification',
};

export const URLS: IURLView = {
	account: [
		{
			index: 0,
			label: LANGUAGE.account.all.title,
			icon: ASSETS.all,
			disabled: false,
			url: urls.accountAll,
			view: AccountAll,
		},
		{
			index: 1,
			label: LANGUAGE.account.collections.title,
			icon: ASSETS.collections,
			disabled: true,
			url: urls.accountCollections,
			view: AccountCollections,
		},
		{
			index: 2,
			label: LANGUAGE.account.bookmarks.title,
			icon: ASSETS.bookmarks,
			disabled: false,
			url: urls.accountBookmarks,
			view: AccountBookmarks,
		},
		{
			index: 3,
			label: LANGUAGE.account.contributions.title,
			icon: ASSETS.contributions,
			disabled: false,
			url: urls.accountContributions,
			view: AccountContributions,
		},
	],
	library: [
		{
			index: 0,
			label: LANGUAGE.library.all.title,
			icon: ASSETS.all,
			disabled: false,
			url: (id: string) => urls.libraryAll(id),
			view: LibraryAll,
		},
		{
			index: 1,
			label: LANGUAGE.library.bookmarks.title,
			icon: ASSETS.bookmarks,
			disabled: false,
			url: (id: string) => urls.libraryBookmarks(id),
			view: LibraryBookmarks,
		},
	],
};

export const STORAGE = {
	none: 'N/A',
};

export const PAGINATOR = 100;

export const CURSORS = {
	p1: 'P1',
	end: 'END',
};

export const MEDIA_TYPES = {
	mp4: 'mp4',
	jpg: 'jpg',
	jpeg: 'jpeg',
	png: 'png',
};

export const POOL_FILTERS = [
	{
		title: LANGUAGE.pools.gridTitles.mostContributed,
		fn: (data: PoolType[]) => filters.sortByMostContributed(data, null),
	},
	{
		title: LANGUAGE.pools.gridTitles.newest,
		fn: (data: PoolType[]) => filters.sortByNewest(data, null),
	},
	{
		title: LANGUAGE.pools.gridTitles.all,
		fn: (data: PoolType[]) => filters.sortByAll(data, null),
	},
];

export const FALLBACK_IMAGE = '8HqSqy_nNRSTPv-q-j7_iHGTp6lEA5K77TP4BPuXGyA';

export const SEARCH = {
	cursorPrefix: 'searchCursor',
	idTerm: '`*',
	ownerTerm: '`%',
};

export const OPERATOR_LINK = 'https://alex-operator-guide.arweave.dev/';
