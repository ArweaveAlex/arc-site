import menuActionSVG from 'assets/action-menu.svg';
import allSVG from 'assets/all.svg';
import arconnectWalletPNG from 'assets/arconnect-wallet-logo.png';
import arrowNextSVG from 'assets/arrow-next.svg';
import arrowPreviousSVG from 'assets/arrow-previous.svg';
import artifactSVG from 'assets/artifact.svg';
import imageArtifactTypeSVG from 'assets/artifact-types/image.svg';
import nostrEventArtifactTypeSVG from 'assets/artifact-types/nostr.svg';
import redditThreadArtifactTypeSVG from 'assets/artifact-types/reddit-thread.svg';
import messagingArtifactTypeSVG from 'assets/artifact-types/twitter.svg';
import defaultArtifactTypeSVG from 'assets/artifact-types/webpage.svg';
import associationSVG from 'assets/association.svg';
import bookmarkSVG from 'assets/bookmark.svg';
import bookmarkSelectedSVG from 'assets/bookmark-selected.svg';
import bookmarksSVG from 'assets/bookmarks.svg';
import checkmarkSVG from 'assets/checkmark.svg';
import closeSVG from 'assets/close.svg';
import collectionsSVG from 'assets/collections.svg';
import contributionsSVG from 'assets/contributions.svg';
import copySVG from 'assets/copy.svg';
import cyclePNG from 'assets/cycle.png';
import dataSVG from 'assets/data.svg';
import disconnectSVG from 'assets/disconnect.svg';
import discordSocialSVG from 'assets/discord.svg';
import dropdownSVG from 'assets/dropdown.svg';
import favoriteSVG from 'assets/favorite.svg';
import impressionsSVG from 'assets/impressions.svg';
import infoGraphicPNG from 'assets/info-graphic.png';
import linkSVG from 'assets/link.svg';
import logoSVG from 'assets/logo.svg';
import logoAltSVG from 'assets/logo-alt.svg';
import logoAlt1SVG from 'assets/logo-alt-1.svg';
import logoAlt2SVG from 'assets/logo-alt-2.svg';
import logoAltActiveSVG from 'assets/logo-alt-active.svg';
import mediaSVG from 'assets/media.svg';
import menuSVG from 'assets/menu.svg';
import mintSVG from 'assets/mint.svg';
import newTabSVG from 'assets/new-tab.svg';
import ownerSVG from 'assets/owner.svg';
import poolSVG from 'assets/pool.svg';
import previewSVG from 'assets/preview.svg';
import repliesSVG from 'assets/replies.svg';
import retweetSVG from 'assets/retweet.svg';
import searchSVG from 'assets/search.svg';
import shareSVG from 'assets/share.svg';
import shareLinkSVG from 'assets/share-link.svg';
import siteLogoSVG from 'assets/site-logo.svg';
import defaultStampSVG from 'assets/stamp-default.svg';
import superStampSVG from 'assets/stamp-super.svg';
import vouchedStampSVG from 'assets/stamp-vouched.svg';
import starSVG from 'assets/star.svg';
import twitterSocialSVG from 'assets/twitter.svg';
import userSVG from 'assets/user.svg';
import * as filters from 'filters/pools';
import { LANGUAGE } from 'helpers/language';
import { IURLView, PoolType } from 'helpers/types';
import * as urls from 'helpers/urls';
import { AccountAll } from 'views/Account/AccountAll';
import { AccountBookmarks } from 'views/Account/AccountBookmarks';
import { AccountCollections } from 'views/Account/AccountCollections';
import { AccountContributions } from 'views/Account/AccountContributions';
import { LibraryAll } from 'views/Library/LibraryAll';
import { LibraryBookmarks } from 'views/Library/LibraryBookmarks';

export const APP = {
	key: 'appVersion',
	version: '1.1.1',
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
		imageArtifactType: 'Alex-Image',
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

export const ASSETS = {
	all: allSVG,
	arrowNext: arrowNextSVG,
	arrowPrevious: arrowPreviousSVG,
	artifact: artifactSVG,
	artifactTypes: {
		default: defaultArtifactTypeSVG,
		image: imageArtifactTypeSVG,
		messaging: messagingArtifactTypeSVG,
		nostrEvent: nostrEventArtifactTypeSVG,
		redditThread: redditThreadArtifactTypeSVG,
		webpage: defaultArtifactTypeSVG,
	},
	association: associationSVG,
	bookmark: bookmarkSVG,
	bookmarkSelected: bookmarkSelectedSVG,
	bookmarks: bookmarksSVG,
	checkmark: checkmarkSVG,
	close: closeSVG,
	collections: collectionsSVG,
	contributions: contributionsSVG,
	copy: copySVG,
	cycle: cyclePNG,
	data: dataSVG,
	disconnect: disconnectSVG,
	dropdown: dropdownSVG,
	favorite: favoriteSVG,
	impressions: impressionsSVG,
	infoGraphic: infoGraphicPNG,
	link: linkSVG,
	logo: logoSVG,
	logoAlt: logoAltSVG,
	logoAltActive: logoAltActiveSVG,
	logoAlt1: logoAlt1SVG,
	logoAlt2: logoAlt2SVG,
	media: mediaSVG,
	menu: menuSVG,
	menuAction: menuActionSVG,
	mint: mintSVG,
	newTab: newTabSVG,
	owner: ownerSVG,
	pool: poolSVG,
	preview: previewSVG,
	replies: repliesSVG,
	retweet: retweetSVG,
	search: searchSVG,
	share: shareSVG,
	shareLink: shareLinkSVG,
	siteLogo: siteLogoSVG,
	social: {
		discord: discordSocialSVG,
		twitter: twitterSocialSVG,
	},
	stamp: {
		default: defaultStampSVG,
		super: superStampSVG,
		vouched: vouchedStampSVG,
	},
	star: starSVG,
	user: userSVG,
	wallets: {
		arconnect: arconnectWalletPNG,
	},
};

export const ARTIFACT_TYPES = {
	[TAGS.values.defaultArtifactType]: {
		label: LANGUAGE.default,
		icon: ASSETS.artifactTypes.default,
	},
	[TAGS.values.imageArtifactType]: {
		label: TAGS.values.imageArtifactType,
		icon: ASSETS.artifactTypes.image,
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

export const DOM = {
	loader: 'loader',
	modal: 'modal',
	notification: 'notification',
	preview: 'preview',
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
			disabled: false,
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

export const POOL_INDEX_CONTRACT_ID = 'G2j_YAD1GQcdtXZEwUIE7VDs8Y0UuWx85inKI-kXajY';

export const OPERATOR_LINK = 'https://alex-operator-guide.arweave.dev/';
