import { PoolType } from 'arcframework';

import aboutHeaderLogoSVG from 'assets/about-header-logo.svg';
import aboutInfoLogo1SVG from 'assets/about-info-logo-1.svg';
import aboutInfoLogo2SVG from 'assets/about-info-logo-2.svg';
import aboutStepsLogo1SVG from 'assets/about-steps-logo-1.svg';
import aboutStepsLogo2SVG from 'assets/about-steps-logo-2.svg';
import aboutStepsLogo3SVG from 'assets/about-steps-logo-3.svg';
import aboutStepsLogo4SVG from 'assets/about-steps-logo-4.svg';
import menuActionSVG from 'assets/action-menu.svg';
import addSVG from 'assets/add.svg';
import allSVG from 'assets/all.svg';
import arLogoSVG from 'assets/ar-logo.svg';
import arconnectWalletPNG from 'assets/arconnect-wallet-logo.png';
import arrowDownSVG from 'assets/arrow-down.svg';
import arrowNextSVG from 'assets/arrow-next.svg';
import arrowPreviousSVG from 'assets/arrow-previous.svg';
import artifactSVG from 'assets/artifact.svg';
import fileArtifactTypeSVG from 'assets/artifact-types/file.svg';
import nostrEventArtifactTypeSVG from 'assets/artifact-types/nostr.svg';
import redditThreadArtifactTypeSVG from 'assets/artifact-types/reddit-thread.svg';
import messagingArtifactTypeSVG from 'assets/artifact-types/twitter.svg';
import defaultArtifactTypeSVG from 'assets/artifact-types/webpage.svg';
import webpageArtifactTypeSVG from 'assets/artifact-types/wikipedia.svg';
import associationSVG from 'assets/association.svg';
import bookmarkSVG from 'assets/bookmark.svg';
import bookmarkSelectedSVG from 'assets/bookmark-selected.svg';
import bookmarksSVG from 'assets/bookmarks.svg';
import checkmarkSVG from 'assets/checkmark.svg';
import cliSVG from 'assets/cli.svg';
import closeSVG from 'assets/close.svg';
import collectionsSVG from 'assets/collections.svg';
import contributeHeaderLogoPNG from 'assets/contribute-header-logo.png';
import contributionsSVG from 'assets/contributions.svg';
import copySVG from 'assets/copy.svg';
import createHeaderLogoSVG from 'assets/create-header-logo.svg';
import dataSVG from 'assets/data.svg';
import disconnectSVG from 'assets/disconnect.svg';
import discordSocialSVG from 'assets/discord.svg';
import dropdownSVG from 'assets/dropdown.svg';
import favoriteSVG from 'assets/favorite.svg';
import fileSVG from 'assets/file.svg';
import filterSVG from 'assets/filter.svg';
import fullScreenSVG from 'assets/full-screen.svg';
import historicalSVG from 'assets/historical-icon.svg';
import impressionsSVG from 'assets/impressions.svg';
import infoSVG from 'assets/info.svg';
import landingGraphicSVG from 'assets/landing-graphic.svg';
import linkSVG from 'assets/link.svg';
import logoSVG from 'assets/logo.svg';
import logoAltSVG from 'assets/logo-alt.svg';
import logoAlt1SVG from 'assets/logo-alt-1.svg';
import logoAlt2SVG from 'assets/logo-alt-2.svg';
import logoAltActiveSVG from 'assets/logo-alt-active.svg';
import mediaSVG from 'assets/media.svg';
import mediaPauseSVG from 'assets/media-pause.svg';
import mediaPlaySVG from 'assets/media-play.svg';
import menuSVG from 'assets/menu.svg';
import mintSVG from 'assets/mint.svg';
import newTabSVG from 'assets/new-tab.svg';
import newsSVG from 'assets/news.svg';
import ownerSVG from 'assets/owner.svg';
import poolSVG from 'assets/pool.svg';
import poolsSVG from 'assets/pools.svg';
import previewSVG from 'assets/preview.svg';
import removeSVG from 'assets/remove.svg';
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
import tradeSVG from 'assets/trade.svg';
import twitterSocialSVG from 'assets/twitter.svg';
import universitySVG from 'assets/university-icon.svg';
import userSVG from 'assets/user.svg';
import * as filters from 'filters/pools';
import { language } from 'helpers/language';
import { IURLView, NavigationComponentType, WalletEnum } from 'helpers/types';
import * as urls from 'helpers/urls';
import { AccountAll } from 'views/Account/AccountAll';
import { AccountBookmarks } from 'views/Account/AccountBookmarks';
import { AccountCollections } from 'views/Account/AccountCollections';
import { AccountContributions } from 'views/Account/AccountContributions';
import { AccountPools } from 'views/Account/AccountPools';
import { LibraryAll } from 'views/Library/LibraryAll';
import { LibraryBookmarks } from 'views/Library/LibraryBookmarks';
import { PoolManageMine } from 'views/Pool/PoolManage/PoolManageMine';
import { DocMiner } from 'views/Pool/PoolManage/PoolManageMine/Miners/DocMiner';
import { FileMiner } from 'views/Pool/PoolManage/PoolManageMine/Miners/FileMiner';
import { PoolManageView } from 'views/Pool/PoolManage/PoolManageView';

export const APP = {
	key: 'appVersion',
	disclaimerShown: 'disclaimerShown',
	version: '1.1.5',
	poolConfig: 'pools.json',
};

export const ASSETS = {
	aboutHeaderLogo: aboutHeaderLogoSVG,
	aboutInfoLogo1: aboutInfoLogo1SVG,
	aboutInfoLogo2: aboutInfoLogo2SVG,
	aboutStepsLogo1: aboutStepsLogo1SVG,
	aboutStepsLogo2: aboutStepsLogo2SVG,
	aboutStepsLogo3: aboutStepsLogo3SVG,
	aboutStepsLogo4: aboutStepsLogo4SVG,
	add: addSVG,
	all: allSVG,
	arrowDown: arrowDownSVG,
	arrowNext: arrowNextSVG,
	arrowPrevious: arrowPreviousSVG,
	artifact: artifactSVG,
	artifactTypes: {
		default: defaultArtifactTypeSVG,
		file: fileArtifactTypeSVG,
		messaging: messagingArtifactTypeSVG,
		news: newsSVG,
		nostrEvent: nostrEventArtifactTypeSVG,
		redditThread: redditThreadArtifactTypeSVG,
		webpage: webpageArtifactTypeSVG,
	},
	association: associationSVG,
	bookmark: bookmarkSVG,
	bookmarkSelected: bookmarkSelectedSVG,
	bookmarks: bookmarksSVG,
	checkmark: checkmarkSVG,
	close: closeSVG,
	cli: cliSVG,
	collections: collectionsSVG,
	contributions: contributionsSVG,
	copy: copySVG,
	contributeHeaderLogo: contributeHeaderLogoPNG,
	createHeaderLogo: createHeaderLogoSVG,
	data: dataSVG,
	disconnect: disconnectSVG,
	dropdown: dropdownSVG,
	favorite: favoriteSVG,
	fullScreen: fullScreenSVG,
	file: fileSVG,
	filter: filterSVG,
	historical: historicalSVG,
	impressions: impressionsSVG,
	info: infoSVG,
	landingGraphic: landingGraphicSVG,
	link: linkSVG,
	logo: logoSVG,
	logoAlt: logoAltSVG,
	logoAltActive: logoAltActiveSVG,
	logoAlt1: logoAlt1SVG,
	logoAlt2: logoAlt2SVG,
	media: mediaSVG,
	mediaPause: mediaPauseSVG,
	mediaPlay: mediaPlaySVG,
	menu: menuSVG,
	menuAction: menuActionSVG,
	mint: mintSVG,
	newTab: newTabSVG,
	owner: ownerSVG,
	pool: poolSVG,
	pools: poolsSVG,
	preview: previewSVG,
	remove: removeSVG,
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
	trade: tradeSVG,
	university: universitySVG,
	user: userSVG,
	wallets: {
		arconnect: arconnectWalletPNG,
		arweaveApp: arLogoSVG,
	},
};

export const TAGS = {
	keys: {
		alexPoolId: 'Alex-Pool-Id',
		ansTitle: 'Title',
		ansDescription: 'Description',
		ansTopic: 'Topic',
		ansType: 'Type',
		ansImplements: 'Implements',
		application: 'Application',
		appName: 'App-Name',
		appType: 'App-Type',
		appVersion: 'App-Version',
		artifactName: 'Artifact-Name',
		artifactSeries: 'Artifact-Series',
		artifactType: 'Artifact-Type',
		associationId: 'Association-Id',
		associationSequence: 'Association-Sequence',
		avatar: 'Avatar',
		banner: 'Banner',
		bookmarkIds: 'Bookmark-Ids-Tag',
		bookmarkSearch: 'Alex-Bookmark-Search',
		childAssets: 'Child-Assets',
		creator: 'Creator',
		dataProtocol: 'Data-Protocol',
		dateCreated: 'Date-Created',
		description: 'Description',
		fileType: 'File-Type',
		handle: 'Handle',
		holderTitle: 'Holder-Title',
		keywords: 'Keywords',
		implements: 'Implements',
		indexedBy: 'Indexed-By',
		initialOwner: 'Initial-Owner',
		initState: 'Init-State',
		license: 'License',
		name: 'Name',
		poolId: 'Pool-Id',
		poolName: 'Pool-Name',
		profileImage: 'Profile-Image',
		profileIndex: 'Profile-Index',
		protocolName: 'Protocol-Name',
		uploaderTxId: 'Uploader-Tx-Id',
		collectionCode: 'Collection-Code',
		contractSrc: 'Contract-Src',
		contractManifest: 'Contract-Manifest',
		contentType: 'Content-Type',
		mediaIds: 'Media-Ids',
		thumbnail: 'Thumbnail',
		tweetId: 'Tweet-ID',
		redditPostId: 'Reddit-Post-ID',
		nostrEventId: 'Nostr-Event-ID',
		timestamp: 'Timestamp',
		title: 'Title',
		topic: (topic: string) => `Topic:${topic}`,
		type: 'Type',
		collectionName: 'Collection-Name',
		collectionDescription: 'Collection-Description',
		renderWith: 'Render-With',
	},
	values: {
		ansTypes: {
			socialPost: 'social-post',
			webPage: 'web-page',
			image: 'image',
			video: 'video',
			music: 'music',
			document: 'document',
			file: 'file',
			collection: 'collection',
			article: 'article',
		},
		audioArtifactType: 'Alex-Audio',
		application: 'Alex.',
		appName: 'SmartWeaveContract',
		appVersion: '0.3.0',
		collection: 'Collection',
		collectionTicker: 'COLLECTION',
		contractManifest:
			'{"evaluationOptions":{"sourceType":"redstone-sequencer","allowBigInt":true,"internalWrites":true,"unsafeClient":"skip","useConstructor":true}}',
		defaultArtifactType: 'Alex-Default',
		document: 'Document',
		documentArtifactType: 'Alex-Document',
		ebookArtifactType: 'Alex-Ebook',
		holderTitle: 'sponsor',
		imageArtifactType: 'Alex-Image',
		indexer: 'ucm',
		initState: {
			name: (name: string) => `Artifact - ${name}`,
			ticker: (assetId: string) => `ATOMIC-ASSET-${assetId}`,
			title: (name: string) => `Alex Artifact - ${name}`,
		},
		license: 'x5UYiin_eRB0XCpZAkpduL0JIaXAUe9Bi2-RXGloBQI',
		messagingArtifactType: 'Alex-Messaging',
		newsArtifactType: 'Alex-News-Article',
		nostrEventArtifactType: 'Alex-Nostr-Event',
		redditThreadArtifactType: 'Alex-Reddit-Thread',
		webpageArtifactType: 'Alex-Webpage',
		videoArtifactType: 'Alex-Video',
		profileVersions: {
			'1': 'Account-0.3',
		},
		poolVersions: {
			'1.2': 'Alex-Archiving-Pool-v1.2',
			'1.4': 'Alex-Archiving-Pool-v1.4',
			'1.5': 'Alex-Archiving-Pool-v1.5',
		},
		searchIndex: 'Alex-Search-Index-v1.0',
		collectionAppType: 'Alex-Collection-v1.0',
		poolIndex: 'Alex-Pool-Index-v1.0',
		ansVersion: 'ANS-110',
		ansType: 'token',
	},
};

export const ARTIFACT_TYPES = {
	[TAGS.values.newsArtifactType]: {
		label: TAGS.values.newsArtifactType,
		icon: ASSETS.artifactTypes.news,
	},
	[TAGS.values.webpageArtifactType]: {
		label: TAGS.values.webpageArtifactType,
		icon: ASSETS.artifactTypes.webpage,
	},
	[TAGS.values.ebookArtifactType]: {
		label: TAGS.values.ebookArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.imageArtifactType]: {
		label: TAGS.values.imageArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.documentArtifactType]: {
		label: TAGS.values.documentArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.audioArtifactType]: {
		label: TAGS.values.audioArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.videoArtifactType]: {
		label: TAGS.values.videoArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.redditThreadArtifactType]: {
		label: TAGS.values.redditThreadArtifactType,
		icon: ASSETS.artifactTypes.redditThread,
	},
	[TAGS.values.messagingArtifactType]: {
		label: TAGS.values.messagingArtifactType,
		icon: ASSETS.artifactTypes.messaging,
	},
	[TAGS.values.nostrEventArtifactType]: {
		label: TAGS.values.nostrEventArtifactType,
		icon: ASSETS.artifactTypes.nostrEvent,
	},
	[TAGS.values.defaultArtifactType]: {
		label: language.default,
		icon: ASSETS.artifactTypes.default,
	},
};

export const ARTIFACT_TYPES_DISPLAY = {
	archives: [
		{ value: null, display: language.artifactTypesDisplay.files, icon: ASSETS.file },
		{ value: null, display: language.artifactTypesDisplay.universities, icon: ASSETS.university },
		{ value: null, display: language.artifactTypesDisplay.historical, icon: ASSETS.historical },
		{
			value: null,
			display: language.artifactTypesDisplay.newsSources,
			icon: ARTIFACT_TYPES[TAGS.values.newsArtifactType].icon,
		},
	],
	platforms: [
		{
			value: TAGS.values.redditThreadArtifactType,
			display: language.artifactTypesDisplay.reddit,
			icon: ARTIFACT_TYPES[TAGS.values.redditThreadArtifactType].icon,
		},
		{
			value: TAGS.values.messagingArtifactType,
			display: language.artifactTypesDisplay.messaging,
			icon: ARTIFACT_TYPES[TAGS.values.messagingArtifactType].icon,
		},
		{
			value: TAGS.values.webpageArtifactType,
			display: language.artifactTypesDisplay.webpage,
			icon: ARTIFACT_TYPES[TAGS.values.webpageArtifactType].icon,
		},
		{
			value: TAGS.values.nostrEventArtifactType,
			display: language.artifactTypesDisplay.nostr,
			icon: ARTIFACT_TYPES[TAGS.values.nostrEventArtifactType].icon,
		},
	],
};

export const AR_WALLETS = [{ type: WalletEnum.arConnect, logo: ASSETS.wallets.arconnect }];

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

export const TAB_OPTIONS = {
	details: language.details,
	view: language.view,
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
	about: {
		decentralization: 'about-decentralization',
		header: 'about-header',
		howItWorks: 'about-how-it-works',
	},
	contribute: {
		header: `contribute-header`,
		howItWorks: `contribute-how-it-works`,
	},
	create: {
		header: `create-header`,
		howItWorks: `create-how-it-works`,
	},
	storage: {
		header: `storage-header`,
		howItWorks: `storage-how-it-works`,
	},
	trade: {
		header: `trade-header`,
		howItWorks: `trade-how-it-works`,
	},
	loader: 'loader',
	modal: 'modal',
	notification: 'notification',
	preview: 'preview',
	renderer: 'renderer',
	sideNavigation: 'side-navigation',
	subheader: 'subheader',
};

export const URLS: IURLView = {
	account: [
		{
			index: 0,
			label: language.account.all.title,
			icon: ASSETS.all,
			disabled: false,
			url: urls.accountAll,
			view: AccountAll,
		},
		{
			index: 1,
			label: language.account.bookmarks.title,
			icon: ASSETS.bookmarks,
			disabled: false,
			url: urls.accountBookmarks,
			view: AccountBookmarks,
		},
		{
			index: 2,
			label: language.account.pools.title,
			icon: ASSETS.pools,
			disabled: false,
			url: urls.accountPools,
			view: AccountPools,
		},
		{
			index: 3,
			label: language.account.collections.title,
			icon: ASSETS.collections,
			disabled: false,
			url: urls.accountCollections,
			view: AccountCollections,
		},
		{
			index: 4,
			label: language.account.contributions.title,
			icon: ASSETS.contributions,
			disabled: false,
			url: urls.accountContributions,
			view: AccountContributions,
		},
	],
	library: [
		{
			index: 0,
			label: language.library.all.title,
			icon: ASSETS.all,
			disabled: false,
			url: (id: string) => urls.libraryAll(id),
			view: LibraryAll,
		},
		{
			index: 1,
			label: language.library.bookmarks.title,
			icon: ASSETS.bookmarks,
			disabled: false,
			url: (id: string) => urls.libraryBookmarks(id),
			view: LibraryBookmarks,
		},
	],
	poolManage: [
		{
			index: 0,
			label: language.poolManage.mine.title,
			icon: null,
			disabled: false,
			url: (id: string) => urls.poolManageMine(id),
			view: PoolManageMine,
		},
		{
			index: 1,
			label: language.poolManage.view.title,
			icon: null,
			disabled: false,
			url: (id: string) => urls.poolManageView(id),
			view: PoolManageView,
		},
	],
};

export const MINING_SOURCES: NavigationComponentType[] = [
	{ label: language.miningSources.files, component: (disabled: boolean) => <FileMiner disabled={disabled} /> },
	{
		label: language.miningSources.newsApi,
		component: (disabled: boolean) => (
			<DocMiner disabled={disabled} doc={'creating-a-pool/mining-artifacts'} id={'news'} />
		),
	},
	{
		label: language.miningSources.twitter,
		component: (disabled: boolean) => (
			<DocMiner disabled={disabled} doc={'creating-a-pool/mining-artifacts'} id={'twitter'} />
		),
	},
	{
		label: language.miningSources.wikipedia,
		component: (disabled: boolean) => (
			<DocMiner disabled={disabled} doc={'creating-a-pool/mining-artifacts'} id={'wikipedia'} />
		),
	},
	{
		label: language.miningSources.reddit,
		component: (disabled: boolean) => (
			<DocMiner disabled={disabled} doc={'creating-a-pool/mining-artifacts'} id={'reddit'} />
		),
	},
	{
		label: language.miningSources.nostr,
		component: (disabled: boolean) => (
			<DocMiner disabled={disabled} doc={'creating-a-pool/mining-artifacts'} id={'nostr'} />
		),
	},
];

export const POOL_SORT_OPTIONS = [
	{
		title: language.pools.gridTitles.mostContributed,
		fn: (data: PoolType[], count: number | null) => filters.sortByMostContributed(data, count),
	},
	{
		title: language.pools.gridTitles.newest,
		fn: (data: PoolType[], count: number | null) => filters.sortByNewest(data, count),
	},
];

export const DEFAULT_POOL_FETCH_COUNT = 9;

export const EXISTING_POOLS_FILTER = {
	History: [
		'XQm-tqqbfheF_nxQm91hiAQRkC3yGvl_Q5NOkFPDqQA',
		'YB4In2J_zXh2qJxeyRCRj21hxiEjjBk7KAz9pos-PPc',
		'zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws',
		'QUgrZ9e2h-DDQgUJoQjKu2_aSNWrGEu9v1V-6qsvGkQ',
		'e9VFV5QC5wWRLpzPC6qfAXqaT0KSs3_VMiWe-OYK3jU',
		'4bAcV86It1tF2f9Sp3qZm5EKXdI9BLeYo_DF8Q8mBrg',
		'm-qVk5-Emy4mYsP3Sual4tN5gzH2EspdZU8d6MdIkw8',
		'-z8TixEDiO3Ml_D-QsSAb0Xon8Mur830XNHsjaeoAnM',
		'Ntjni_2sQ3XznM1Eof2lWE_mc8pP_3a64tBYkswiHyE',
		'P53Hd6kSjNlBHLuuS9bPg2uI4tHEoD--GXnBZ37DIxg',
		'1Mst1y_Di8Y5vqb1zUIypGL4zrjRJGrDS2eytgRzjNA',
		'-CtT8CfBemYxjB1GWhUujghJqbY6mqqMPmLzsXozyYk',
		'tzNoMg0qMKaeBfz8-I3vJ9WDy0iWOvkHRRToWR0SdW4',
		'SAHauW5jIVPl2e6gJ8h77uHhunM2-5Rcpr1p--Nr7oU',
	],
	Philosophy: [],
	International: [
		'zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws',
		'e9VFV5QC5wWRLpzPC6qfAXqaT0KSs3_VMiWe-OYK3jU',
		'm-qVk5-Emy4mYsP3Sual4tN5gzH2EspdZU8d6MdIkw8',
		'-z8TixEDiO3Ml_D-QsSAb0Xon8Mur830XNHsjaeoAnM',
		'P53Hd6kSjNlBHLuuS9bPg2uI4tHEoD--GXnBZ37DIxg',
		'-CtT8CfBemYxjB1GWhUujghJqbY6mqqMPmLzsXozyYk',
		'SAHauW5jIVPl2e6gJ8h77uHhunM2-5Rcpr1p--Nr7oU',
	],
	Culture: [
		'aWr5_vW_1WgOQabfYCwFNMmbhNlCqzkb1Uz_DAZxCto',
		'Y4TH_DV7zk-uyE2V2iPH2L-exC_I5No20Xi2yO70fqs',
		'NTrE1WKisb0AsIY0NUSWcyWaBQTQH5c4DZ4XBXqCczk',
		'EzG5UvHnylQiLyPKRulE0GxI-oVFT6C8y5D38Hhl5Pg',
	],
	Art: [],
	Music: [],
	News: [
		'YB4In2J_zXh2qJxeyRCRj21hxiEjjBk7KAz9pos-PPc',
		'zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws',
		'QUgrZ9e2h-DDQgUJoQjKu2_aSNWrGEu9v1V-6qsvGkQ',
		'HvG-2dzOyzKBe3WCNxJYORmm6r6MgTN7Pv_KX0ae81Y',
		'e9VFV5QC5wWRLpzPC6qfAXqaT0KSs3_VMiWe-OYK3jU',
		'm-qVk5-Emy4mYsP3Sual4tN5gzH2EspdZU8d6MdIkw8',
		'-z8TixEDiO3Ml_D-QsSAb0Xon8Mur830XNHsjaeoAnM',
		'P53Hd6kSjNlBHLuuS9bPg2uI4tHEoD--GXnBZ37DIxg',
		'SAHauW5jIVPl2e6gJ8h77uHhunM2-5Rcpr1p--Nr7oU',
	],
	Faith: [],
	Science: [
		'zIZXNTl-GtTDbO8eP8LpkHks5S5WhB4j82YX-N2RuGw',
		'MGVO6tBBzLpQNVXB-Uk25n0iCQRPE4Hn057GGaQPneE',
		'HvG-2dzOyzKBe3WCNxJYORmm6r6MgTN7Pv_KX0ae81Y',
	],
	Spirituality: [],
	Sports: [],
	Business: [],
	Technology: [
		'Y4TH_DV7zk-uyE2V2iPH2L-exC_I5No20Xi2yO70fqs',
		'NTrE1WKisb0AsIY0NUSWcyWaBQTQH5c4DZ4XBXqCczk',
		'p-k5wczzPAW-xqbxfrKxJw3RlmRI0mnkiOirR9PXpK4',
		'0pvk47B0jPpp5ZAl_ONjWoEVYo8QFRvmYF0SbrVyBYM',
		'1Mst1y_Di8Y5vqb1zUIypGL4zrjRJGrDS2eytgRzjNA',
		'WdcJfRKf_keODGDJKgqQlU1MIio_GzVwmYHzpqYdySI',
		'dZ5si3ANRal7rOpAhhdoViph2YGk2ULE2nKVmvq7SLI',
		'rj9j8PXXtRbDAW6zM3pbjq9GnmIvr3aL9CjS5Kgapww',
	],
	Politics: ['YB4In2J_zXh2qJxeyRCRj21hxiEjjBk7KAz9pos-PPc', 'fgXcuK0fFh6UNphEgK7iJaV2VSekFDlbillL1zLKYB0'],
	Other: [
		'aWr5_vW_1WgOQabfYCwFNMmbhNlCqzkb1Uz_DAZxCto',
		'HvG-2dzOyzKBe3WCNxJYORmm6r6MgTN7Pv_KX0ae81Y',
		'EzG5UvHnylQiLyPKRulE0GxI-oVFT6C8y5D38Hhl5Pg',
		'GdtUa5Nr4lfhSNUAMg-r8ocncMgoJiKtHrb56cnVq-0',
	],
};

export const POOL_TEST_MODE = false;

export const DRE_NODE = 'https://dre-u.warp.cc/contract';
export const DRE_NODE_1 = 'https://dre-1.warp.cc/contract';

export const CURRENCIES = {
	default: 'U' as 'U',
};

export const API_CONFIG = {
	arweaveGet: 'arweave.net',
	arweavePost: 'arweave.net',
	protocol: 'https',
	port: 443,
	timeout: 40000,
	logging: false,
};

export const REDIRECTS = {
	bazar: {
		asset: (id: string) => `https://bazar.arweave.dev/#/asset/${id}`,
		collection: (id: string) => `https://bazar.arweave.dev/#/collection/${id}`,
	},
};

export const DEFAULT_LICENSE = {
	License: 'yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8',
	Access: 'public',
};

export const CURSORS = {
	p1: 'P1',
	end: 'END',
};

export const GATEWAYS = {
	arweave: 'arweave.net',
	goldsky: 'arweave-search.goldsky.com',
};

export const AR_PROFILE = {
	defaultAvatar: 'OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA',
	defaultBanner: 'a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k',
};

export const UPLOAD_CONFIG = {
	node1: 'https://up.arweave.network',
	node2: 'https://turbo.ardrive.io',
	batchSize: 1,
	chunkSize: 7500000,
};

export const STORAGE = {
	none: 'N/A',
};

export const PAGINATORS = {
	default: 100,
};

export const DEFAULT_COLLECTION_THUMBNAIL = '0zSu02XsjXSw8PSZGKIS3Qw01BNVfTOpExT6Z0L5uNo';
