const ARCONNECT_REDIRECT = 'https://www.arconnect.io/';
const TURBO_REDIRECT = 'https://ardrive.io/turbo-bundler/';

export const language = {
	about: `About`,
	aboutView: {
		header1: `Preserving`,
		header2: `Human History`,
		steps: {
			list: [
				{
					header: `Creating pools`,
					description: `An operator creates a pool. A pool operator can be a historical institution, or anyone that is interested in preserving a topic.`,
					action: {
						label: `Learn about creating`,
						href: `/create/`,
					},
				},
				{
					header: `Contributing to pools`,
					description: `Users contribute Arweave tokens ($AR) through Turbo to pools that they find valuable. These contributions pay for the storage space on Arweave.`,
					action: {
						label: `Learn about contributing`,
						href: `/contribute/`,
					},
				},
				{
					header: `Preserve artifacts`,
					description: `Pool operators can now collect artifacts. Documents, books, images, audio clips, videos, etc. within the pool are uploaded to Arweave. Since the artifacts are stored on Arweave, they cannot be changed or removed by anyone.`,
				},
				{
					header: `Collect artifacts`,
					description: `Contributors will be made the sponsor of an amount of digital artifacts equal to the percentage of their $AR contribution (relative to the total $AR contributed).`,
				},
			],
		},
		subHeader1: `<p>Inspired by the Great Library of Alexandria, the mission of Alex. is to <span>preserve important historical artifacts</span> for the enrichment of all people.</p>`,
		subHeader2: `In order for humanity to move forward, we need to clearly see our past.`,
		detail: {
			artifactTypes: `Artifacts are preserved from:`,
			action: `Learn how to create`,
			section1: {
				header: 'Alex.',
				description: 'A decentralized archival platform that preserves human history and culture digitally. ',
				footer:
					'Alex. leverages the immutable and permanent data storage of Arweave. Institutions and creators are incentivized to publicly archive digital content by allowing anyone to become sponsors of their digital <b>artifacts</b>. Artifacts are grouped together into <b>pools</b>.',
			},
			section2: {
				header: 'What is a pool?',
				description: 'A pool is a topic, event, or idea that can be digitally and publicly archived.',
				footer: 'Anyone can create a pool and earn rewards.',
			},
			section3: {
				header: 'What is an artifact?',
				description:
					'An aritfact is a permanently preserved piece of digital content, including <b>documents</b>, <b>books</b>, <b>images</b>, <b>audio</b>, or <b>videos</b>.',
				footer:
					'Artifacts are deployed as atomic assets to Arweave and distributed to the contributors who support the pool.',
			},
		},
		infoDescription1: `<b>Archiving is important.</b> Archives allow people to look back at history to ensure better decisions are made for the future of society. Unfortunately, the current model for archiving is insufficiently incentivized. The person that stores the data, which others can later access without charge, is the person that has to pay. Alex. changes this by allowing the public to sponsor the archiving of digital content.`,
		infoDescription2: `Currently, historical archives are often controlled by a single centralized entity. This means that data can be manipulated or censored to benefit special interests. Therefore <b>Alex. uses Arweave to preserve important historical and cultural information</b> that may otherwise be lost, tampered with, or held hostage in a centralized server.`,
		infoHeader1: `Decentralized archiving`,
		stepsHeader1: `How it works`,
		subnav: {
			decentralization: 'Decentralization',
			header: 'Alex. ecosystem',
			howItWorks: 'How it works',
		},
	},
	add: `Add`,
	address: `Address`,
	amount: `Amount`,
	applyChanges: `Apply changes`,
	appName: `Alex.`,
	artifactDetails: `Artifact details`,
	artifactName: `Artifact name`,
	artifactNotFound: `Artifact not found`,
	artifactTypesDisplay: {
		files: `Personal archives`,
		historical: `Historical organizations`,
		newsSources: `News sources`,
		nostr: `Nostr`,
		messaging: `Twitter`,
		reddit: `Reddit`,
		universities: `Universities`,
		webpage: `Wikipedia`,
	},
	artifactsCreated: `of artifacts created`,
	arweaveAppConnectionError: `Connection error with Arweave.app. The connector window must remain open after the initial connection.`,
	accept: `Accept`,
	account: {
		header1: `Account`,
		all: { title: `Artifacts` },
		bookmarks: { title: `Bookmarks` },
		collections: { title: `Collections` },
		contributions: { title: `Contributions` },
		pools: { title: `Pools` },
	},
	actions: `Actions`,
	activePools: `Active pools`,
	addField: `Add field`,
	addGroupOption: `Add group option`,
	addToBookmarks: `Add to bookmarks`,
	addToGroup: `Add to group`,
	amountExceedsBalance: `Amount exceeds balance`,
	amountExceedsMaxTransferAmount: `Amount exceeds Maximum Transfer Amount`,
	artifact: `Artifact`,
	artifactCount: `Artifact count`,
	artifactGroup: `Artifact group`,
	artifactListedForSale: `This artifact has been listed for sale!`,
	artifactPreview: `Artifact preview`,
	artifactStamped: `Artifact stamped`,
	artifactType: `Artifact type`,
	artifacts: `Artifacts`,
	artifactDetail: {
		fileInformation: `File information`,
		viewRaw: `View raw`,
		tags: `Tags`,
		title: `Title`,
	},
	artifactListingPrice: `Artifact listing price`,
	artifactListingPriceInfo: `This value represents the price for each artifact that will be listed on the UCM`,
	artifactAssociationInfo: `This artifact is associated to other artifacts`,
	artifactMediaInfo: `This artifact contains media`,
	artifactTradeableInfo: `This artifact is tradeable by its sponsor`,
	arTokens: `$AR`,
	availableBalance: `Available balance`,
	back: `Back`,
	banner: {
		header1: `A decentralized archival platform that preserves human history and culture digitally.`,
		subheader1: `Archives are permanently stored on`,
		subheader2: `Win up to 60 $AR by joining the 2024 Alex Poolathon`,
	},
	basicInformation: `Basic information`,
	bookmarks: `Bookmarks`,
	bookmarksUpdated: `Bookmarks updated`,
	cancel: `Cancel`,
	chooseFiles: `Choose files`,
	chooseTopics: `Choose topics`,
	clear: `Clear`,
	close: `Close`,
	closePreview: `Close preview`,
	collection: {
		subheader1: `Collection`,
		success: `Collection saved!`,
		failure: `Collection failed to save.`,
	},
	collectionDetails: `Collection details`,
	tradeDisclaimerHeader: `Disclaimer: Trading of artifact sponsorship`,
	tradeDisclaimerInfo: `Please be aware of the following terms and conditions when engaging in the trading of sponsorship for atomic assets mined from the Alex. Archive:<br><b>Ownership and Attribution:</b> All artifacts available on Alex Marketplace are atomic assets, and all associated rights are credited to the asset holder, identified by their (holdertagname) as specified in the asset metadata.<br><b>Artifact Sponsorship:</b> By participating as an artifact sponsor, you are assuming the responsibility of sponsoring the storage of digital content on the Arweave platform.<br><b>Trading Decisions:</b> The decision to trade the sponsorship of artifacts, on BazAR or any other marketplace is solely at the discretion of the artifact sponsors. Alex Archive, the platform operator, bears no responsibility for the outcomes or consequences of these trading activities.<br><b>Compliance with Licensing:</b> Artifact sponsors are required to adhere to all licensing requirements set forth by the content owner. It is essential to ensure that any sponsored content complies with the applicable licensing terms.<br>As a general guideline, only artifacts that fall within the public domain or for which the artifact sponsor has obtained proper licensing and permissions should be considered for trading. Unauthorized or infringing content may result in legal consequences.It is essential to exercise diligence and responsibility when engaging in any trading activities and to respect the rights and licenses associated with the digital content involved.`,
	collectionNameAlreadyExists: `Collection Name already exists`,
	collections: `Collections`,
	collectionCreated: `Collection created`,
	comments: `Comments`,
	confirmTransfer: `Confirm transfer`,
	connect: `Connect`,
	connectWallet: `Connect wallet`,
	connectionError: `Connection wrror`,
	connectorNotFound: `This connector was not found`,
	contribute: `Contribute`,
	contributeTo: `Contribute to`,
	contributeView: {
		header1: `Contribute to a pool`,
		subHeader1: `<p>Anyone can contribute to a pool, which pays for the storage costs of its <span>artifacts</span>.`,
		subHeader2: `<b>Archiving is a public good</b>. Allowing people access to information about the past enables them to make higher
		quality decisions in the present. Currently, however, archiving is insufficiently incentivized: The person 
		that stores the data, which other's can later access without charge, is the person that has to pay.
		<b>Alex. changes this</b>. By allowing its community to become micro-sponsors of digital artifacts, an incentive is
		created for developers and creators to publically archive great digital works on Arweave.`,
		detail: {
			artifactTypes: `Artifacts are preserved from:`,
			action: `Learn more about Arweave wallets`,
			section1: {
				header: 'What does contributing to a pool mean?',
				description:
					'Contributing means to send a portion of your <b>($AR)</b> to a pool. Contributions are done made through <a target="_blank" href=${TURBO_REDIRECT}>Turbo</a>, which converts fiat currencies to $AR.  Contributions are used to pay for the storage costs of artifacts stored on Arweave. A portion of contributions also go to pool operators for their work.',
				footer:
					'Artifacts are deployed as atomic assets to Arweave and distributed to the contributors who support the pool.',
			},
			section2: {
				header: 'How to contribute?',
				description1: `First, you must create and connect an Arweave wallet. You can create a wallet at <a target="_blank" href=${ARCONNECT_REDIRECT}>arconnect.io</a>. You can connect your wallet in Alex. by selecting <b>Connect Wallet</b> in the navigation menu.`,
				description2: `Next, you can select the <b>Contribute</b> button in any of the open pool pages. A window will appear which allows you to select the amount to contribute through <a target="_blank" href=${TURBO_REDIRECT}>Turbo</a>. This also shows the percentage of artifacts you will receive for contributing based on the amount of <b>($AR)</b> that you send.`,
				description3:
					'After the contribution is received and the pool operator continues to mine artifacts, you will then be able to see your artifacts in your account.',
				description4: 'Learn more about how contributing works in our documentation.',
			},
			section3: {
				header: 'Why sponsor artifacts?',
				description:
					'Sponsoring artifact storage creates a new incentive for users to contribute to permanent archiving of digital content. <b>Anyone can contribute to pools and earn artifacts</b>. These artifacts can never be modified or removed as they are permanently stored on Arweave as atomic assets. Artifacts come in the form of documents, books, images, audio, videos, and more.',
				footer:
					'Artifact sponsorships in some archival pools are even made tradeable on BazAR (UCM). These sponsorships can be traded for $U. Learn more about trading <a href="https://alex.arweave.dev/#/trade/" target="_blank" rel="noopener noreferrer">here</a>.',
			},
		},
		subnav: {
			header: `Contributing`,
			howItWorks: 'How it works',
		},
	},
	contributionMessage: `Turbo credits will be automatically sent to the wallet of the pool owner. They will be able to start using them right away.`,
	contributionPercentage: `Management fee`,
	contributionPercentageMessage: (percentage: string) =>
		`* This pool operator will claim ${percentage}% of the contribution as a management fee.`,
	contributionPercentageTooltip: `This value represents a management fee of the contributions. This value can be from 0 - 100 and represents the total percentage of contributions that go to your control wallet for mining. If the value of Management Fee is 10, then 10% of all contributions will remain in your wallet as your personal funds. This percentage will appear in the user interface to let contributors know how much of their contribution will go to the operator.`,
	contributions: `Contributions`,
	contributors: {
		recent: `Recent contributors`,
		top: `Top contributors`,
	},
	conversion: `Conversion`,
	copied: `Copied!`,
	copyAddress: `Copy address`,
	copyArtifactId: `Copy artifact ID`,
	create: `Create`,
	createCollection: `Create a collection`,
	creatingCollection: `Creating collection`,
	createFirstCollection: `Create your first collection`,
	createListings: `Create listings`,
	createPool: `Create a pool`,
	createView: {
		header1: `Create with Alex.`,
		steps: {
			display: `Step`,
			list: [
				{
					header: `Think of a topic to archive`,
					description: `This can be a <span>historical event, current event, cultural topic, innovation, or anything that can be digitally preserved.</span> Once you have your topic, you must decide where you will mine the artifacts from. It can be from social media <span>(Twitter, Reddit, Nostr), websites (Wikipedia, news sources),</span> or your own <span>personal archive.</span>`,
					action: {
						label: `Current pools`,
						href: `/pools`,
					},
				},
				{
					header: `Connect your wallet`,
					description: `Before building a pool, you must connect your Arweave wallet. You can connect your wallet in Alex. by selecting Connect Wallet in the navigation menu. You can create a wallet at <a target="_blank" href=${ARCONNECT_REDIRECT}>arconnect.io</a>.`,
					action: {
						label: `Learn about wallets`,
						href: `https://cookbook.arweave.dev/concepts/keyfiles-and-wallets.html`,
						targetBlank: true,
					},
				},
				{
					header: `Build the pool`,
					description: `You can start building your pool from our pool creation page. This is where you will include all necessary information to display the pool on the pools page and start mining. This includes writing a description of the pool, including a header image, keywords, and determining the percentage of contributions that you will receive as a management fee.`,
					action: {
						label: `Create a pool`,
						href: `/pools/create`,
					},
				},
				{
					header: `Fund the pool`,
					description: `Once a pool is configured and created, <span>($AR)</span> is needed to store the artifacts and run the mining processes. Users are encouraged to support pools by contributing <span>($AR)</span> through Turbo to pools to pay for storage costs and become sponsors of artifacts.`,
					action: {
						label: `Learn About contributing`,
						href: `/docs/contributing`,
					},
				},
				{
					header: `Start archiving`,
					description: `Once you receive contributions, you can then begin archiving. You may upload files directly from the User Interface. Your pool can be found from the pools tab in your account. If you are archiving from social media, you can follow our documentation to archive from specific platforms. On your specific pool page you will see artifacts start to accrue. The key to running a successful pool is consistent and accurate archiving based on the pool topic.`,
					action: {
						label: `Visit mining documentation`,
						href: `/docs/creating-a-pool/mining-artifacts`,
					},
				},
			],
		},
		stepsHeader1: `How it works`,
		subHeader1: `<p>If you have an idea, topic or event that you would like to preserve forever, you can create a pool and earn <span>($AR)</span> for it.</p>`,
		subHeader2: `Anyone can create a pool with Alex. for any given topic/event. An operator creates a pool and mines artifacts into it. These artifacts are deployed as 1:1 atomic assets to Arweave and distributed to the contributors based on the amount of <b>$AR</b> contributed.`,
		subnav: {
			header: `Create with Alex.`,
			howItWorks: `How it works`,
		},
	},
	createdOn: `Created on`,
	customAmount: `Custom amount`,
	customAmountTurboInfo: `min $5 - max $10,000`,
	dateCreated: `Date created`,
	default: `Default`,
	details: `Details`,
	description: `Description`,
	disconnect: `Disconnect`,
	docs: `Docs`,
	docsTitle: `Documentation`,
	download: `Download`,
	downloadPoolConfig: `Download pool configuration`,
	downloadPoolConfigTooltip: `Download the necessary configuration file to operate this pool from the Alex. CLI`,
	editArtifactName: `Edit artifact name`,
	editSelectedArtifacts: `Edit selected artifacts`,
	enterFullScreen: `Enter full screen`,
	errorFetchingArtifact: `Error fetching artifact`,
	errorOccurred: `Error occurred`,
	evolvePool: `Evolve pool`,
	exit: `Exit`,
	exploreMore: `Explore more`,
	factMarket: `Fact Market`,
	factMarketCreated: `Fact Market created`,
	fetching: `Fetching`,
	fetchingBalance: `Fetching balance`,
	fetchingCount: `Fetching count`,
	fetchingReceivingPercentage: `Fetching receiving amount`,
	field: `Field`,
	fileName: `File name`,
	filesUploading: `Files uploading`,
	filesUploadingMessage: `This may take some time, please stay on this screen. Signatures are required for each upload.`,
	filesUploadingMessageComplete: `Your artifacts have been created, it will take some time for them to settle on the Arweave network. Once they have, you will be able to find them in your pool.`,
	fileUploadComplete: `File Upload Complete!`,
	filesAndMetadata: `Files & Metadata`,
	filesSelected: `Files selected`,
	filterByPoolTopic: `Filter by pool topic`,
	filterResults: `Filter results`,
	funded: `Funded`,
	fundsTransferFailedMessage: `There was a problem transferring your funds. It could be due to existing funds currently processing in the network.`,
	fundsTransferInitiatedMessage: `Your transfer has been initiated. It usually takes 20 - 30 minutes for the transfer to complete. You can verify the transfer by checking the Pool Balance progress bar on this screen.`,
	fundTurboPaymentHeader: `Complete payment`,
	fundTurboPaymentDetail: `Pool contributions are securely handled by <a href=${TURBO_REDIRECT} target='_blank'>ArDrive Turbo</a>`,
	fundsTransferred: `Funds transferred`,
	groupName: `Group name`,
	groupExists: `Group already exists`,
	handle: `Handle`,
	headerImage: `Header image`,
	invalidAmountTurbo: `Amount must be between $5 - $10,000`,
	invalidContributionPercentage: `This value can be between 0 and 100`,
	invalidMetadataField: `Metadata fields must be unique`,
	invalidQuery: `Invalid query`,
	invalidTitle: `Invalid title`,
	invalidWalletPoolManage: `You do not have permission to manage this pool`,
	keywordTooltip: `Keywords are relevant values to a pool used to search through different platforms while mining artifacts, they also are attached to each artifact in a pool.`,
	keywords: `Keywords`,
	landingView: {
		infoHeader1: `Contribute to a pool`,
		infoSubheader1: `Anyone can become a sponsor of artifacts.`,
		infoDescription1: `Pools are topics, events or ideas that are preserved digitally on Arweave. By contributing <b>($AR)</b> to pools, you pay for the storage space, and earn a stake in the artifacts mined into pools.`,
		infoAction1: `Learn about contributing`,
		infoHeader2: `Create a pool`,
		infoSubheader2: `Anyone can start preserving artifacts.`,
		infoDescription2: `Anyone can start their own pool on any topic or idea they choose and earn <b>($AR)</b> for archiving. As the pool operator you can control what artifacts are mined and how much you earn.`,
		infoAction2: `Create a pool`,
	},
	lastContribution: `Last contribution`,
	learnAboutCreating: `Learn about creating`,
	library: {
		header1: `Library`,
		all: { title: `All` },
		new: { title: `New` },
		bookmarks: { title: `Bookmarks` },
	},
	loading: `Loading`,
	loadMore: `Load more`,
	managePool: `Manage pool`,
	maxTransferAmount: `Max transfer amount`,
	mediaCaution: `Caution: Media may contain inappropriate content.`,
	messaging: {
		handle: `Handle`,
		message: `Message`,
		name: `Name`,
		originalPostDate: `Original post date`,
	},
	metadataField: `Metadata field`,
	metadataUpdated: `File metadata updated`,
	miningSource: `Mining source`,
	miningSources: {
		files: 'Files & Metadata',
		newsApi: 'News',
		twitter: 'Twitter',
		wikipedia: 'Wikipedia',
		reddit: 'Reddit',
		nostr: 'Nostr',
	},
	name: `Name`,
	navigation: `Navigation`,
	next: `Next`,
	noArtifacts: `No artifacts`,
	noContributions: `No contributions`,
	noPools: `No pools`,
	noResults: `No results`,
	of: `of`,
	ofArtifactsCreated: `of new artifacts created`,
	openInNewTab: `Open in New Tab`,
	operatorContributionsRestricted: `Operator contributions not allowed`,
	oppose: `Oppose`,
	originalUrl: `Original URL`,
	owner: `Sponsor`,
	ownerInfo: `Owner information`,
	pageNotFound: `Page not found`,
	paths: {
		about: `About`,
		contribute: `How to contribute`,
		create: `How to create a pool`,
		docs: `Docs`,
		trade: `About trading artifacts`,
		pools: `Pools`,
		poolCreate: `Create`,
		storage: `About our storage`,
	},
	pause: `Pause`,
	play: `Play`,
	pool: {
		subheader1: `Pool`,
		artifactsCreated: `Artifacts created`,
		totalContributionSponsors: `Total sponsors`,
		contribute: {
			notEnoughFunds: `Not enough AR to contribute to this pool.`,
			failed: `Failed to contribute to pool. Please try again.`,
			success: `Thank you for your contribution.`,
		},
	},
	poolBalance: `Pool balance`,
	poolBalanceInfo: `This balance represents the funds currently available for mining use, based on the amount of Turbo Credits in this wallet.`,
	poolConfiguration: `Pool configuration`,
	poolConfigurationInfo: `This configuration can be used for mining with the Alex. CLI. Please enter a Pool ID which will be used to identify the pool in the CLI.<br><br>After downloading this configuration, please visit our documentation for next steps. You will need to enter additional information into the configuration to successfully mine artifacts in the CLI.`,
	poolConfigurationNotFound: `Pool configuration not found`,
	poolContributions: (title: string) => `${title} Contributions`,
	poolContractEvolved: `Pool contract evolved`,
	poolManage: {
		mine: { title: 'Mine artifacts' },
		view: { title: 'View artifacts' },
	},
	poolAlreadyExists: `This pool already exists`,
	poolCreated: `Success, pool created!`,
	poolCreatedInfo: `Congratulations on starting a new pool! You will be able to start mining artifacts when the pool transaction has settled on the Arweave network and a contribution to the pool has been made. You can find your pool from the pools tab on your account page, and you can begin managing your pool by clicking Manage Pool below.`,
	poolId: `Pool ID`,
	poolTradeableOption: `Artifacts archived from this pool are tradeable via UCM`,
	pools: {
		header1: `Pools`,
		gridTitles: {
			mostContributed: `Most active`,
			newest: `Recently added`,
		},
	},
	previewArtifact: `Preview artifact`,
	previewCollection: `Preview collection`,
	previous: `Previous`,
	price: `Price`,
	publish: `Publish`,
	ready: `Ready`,
	recentlyMintedArtifacts: `Recently minted artifacts`,
	receiving: `Receiving`,
	redditAuthor: `Posted by u/`,
	removeField: `Remove field`,
	removeFile: `Remove file`,
	removeFromBookmarks: `Remove from bookmarks`,
	save: `Save`,
	search: `Search`,
	select: `Select`,
	selectChooseFiles: `Select <b>Choose Files</b> to start uploading`,
	sellArtifact: `Trade sponsorship`,
	sellArtifactDescription: `This order will be listed in the UCM for the specified amount of $U`,
	share: `Share`,
	shareArtifact: `Check out this Alex. Artifact !`,
	sharePool: `Check out this Alex. Pool !`,
	sharePools: `Check out these Alex. Pools !`,
	shareUrlLabel: `Share (Copy URL)`,
	show: `Show`,
	showMoreReplies: `Show more replies`,
	siteTitle: `Alex.`,
	social: {
		discord: `Discord`,
		twitter: `Twitter`,
	},
	sortBy: `Sort by`,
	sourceNotSupportedInfo: `This mining source is only supported from the CLI. View the documentation to learn how to mine this source.`,
	stamp: `Stamp`,
	stamps: `Stamps`,
	stampsVouched: `Vouched Stamps`,
	storageView: {
		header1: `About our storage technology`,
		subHeader1: `<p>Pay once, store forever with Arweave </p>`,
		subHeader2: `Unlike traditional archiving services, our platform only requires users to pay once and store data forever on the Arweave network.`,
		detail: {
			section1: {
				header: 'What is Arweave?',
				description:
					'Arweave is a decentralized protocol that provides permanent, accessible and tamper-proof data storage. The Arweave network uses a blockchain-like data structure called the Blockweave, and is backed by a sustainable endowment that guarantees that data is stored for at least 200 years, but likely much longer.',
				footer:
					'Learn more about Arweave <a href="https://arwiki.wiki/#/en/main" target="_blank" rel="noopener noreferrer">here.</a>',
			},
			section2: {
				header: 'How to buy $AR tokens?',
				description1: `Arweave’s native token AR is used to purchase storage space on the network. If you want to contribute to an archival pool, here is how you purchase AR tokens. Tokens are either bought through a centralized exchange (CEX) or a decentralized exchange (DEX).`,
				description2: 'Please note that some exchanges are not registered in some countries.',
				description3: 'Popular exchanges include:',
				list1: '<a href="https://crypto.com/price/arweave" target="_blank" rel="noopener noreferrer">Crypto.com</a>',
				list2:
					'<a href="https://www.binance.com/en/price/arweave" target="_blank" rel="noopener noreferrer">Binance</a>',
				list3:
					'<a href="https://uphold.com/assets/crypto/buy-arweave" target="_blank" rel="noopener noreferrer">Uphold</a>',
				list4: '<a href="https://www.huobi.com/en-us/" target="_blank" rel="noopener noreferrer">Huobi</a>',
				list5: '<a href="https://wazirx.com/exchange/AR-INR" target="_blank" rel="noopener noreferrer">Warzix</a>',
				list6: '<a href="https://app.permaswap.network/" target="_blank" rel="noopener noreferrer">Permaswap</a> (DEX)',
				footer: '<b> This is not financial advice. Please do your own research.<b>',
			},
		},
		subnav: {
			header: `About Arweave`,
			howItWorks: 'How to get $AR',
		},
	},
	superStamp: `Super Stamp`,
	submit: `Submit`,
	success: `Success`,
	support: `Support`,
	tableOfContents: `Table of Contents`,
	tableKey: `Table key`,
	tableKeyInfo: `Icons associated to certain artifacts in this table represent the following`,
	title: `Title`,
	topic: `Topic`,
	topics: `Topics`,
	total: `Total`,
	totalContributed: `Total contributed`,
	totalCount: `Total count`,
	trade: 'Trade',
	tradeView: {
		header1: `Trade artifact sponsorships`,
		subHeader1: `<p>Contribute to archival pools, earn artifact sponsorships, and then trade these sponsorships on the permaweb to earn $U.`,
		subHeader2: `Becoming a micro-sponsor of digital artifacts provides the community with an incentive to contribute to pools, ensuring that exceptional digital works can be securely stored on Arweave.`,
		detail: {
			artifactTypes: `Artifacts are preserved from:`,
			action: `Learn about Wallets`,
			section1: {
				header: 'What does it mean to trade artifact sponsorships?',
				description:
					'Artifact sponsorships are the atomic assets that contributors earn for contributing to archival pools. These sponsorships prove that a user provided the $AR for a piece of digital content to be permanently archived on Arweave.',
				footer:
					'Sponsorship owners can list their atomic assets on the <a href="https://bazar.arweave.dev/" target="_blank" rel="noopener noreferrer">BazAR</a> Marketplace straight from their account page on Alex. Please note that Alex. is not liable for any artifact sponsorships that are traded without permission of the content creator. Read our full terms and coditions for trading artifact sponsorships <a href="https://alex.arweave.dev/#/docs/interact-with-artifacts" target="_blank" rel="noopener noreferrer">here</a>.',
			},
			section2: {
				header: 'How to list your artifact sponsorships on BazAR?',
				subheader1:
					'After contributing to a pool and receiving artifact sponsorships, here is how to trade them individually:',
				description1: `1. Select the artifact you want to trade.`,
				description2: '2. Select “Trade Sponsorship” from the list of actions.',
				description3:
					'3. Set the price in $U. Learn more about $U <a href="https://u-wiki.arweave.dev/#/en/main" target="_blank" rel="noopener noreferrer">here</a>.',
				description4: '4. You can view your listing on your BazAR account page.',
				subheader2: 'If you want to trade a collection of artifact sponsorships, follow these steps:',
				collectionDescription1: `1. Go to your accounts page and select "Collections."`,
				collectionDescription2: '2. Create a new collection.',
				collectionDescription3: '3. Choose the artifacts you want to include in the collection.',
				collectionDescription4: '4. Provide a title, description, and topic for the collection (visible on BazAR).',
				collectionDescription5:
					'5. Review the terms for listing artifact sponsorships (a popup with terms will appear). You can also read the terms for trading artifact sponsorships <a href="https://alex.arweave.dev/#/docs/interact-with-artifacts" target="_blank" rel="noopener noreferrer">here</a>',
				collectionDescription6:
					'6. Set the price in $U. Learn more about $U <a href="https://u-wiki.arweave.dev/#/en/main" target="_blank" rel="noopener noreferrer">here</a>.',
				collectionDescription7: '7. You can view your collection listing on your BazAR account page.',
			},
			section3: {
				header: 'What is the $U token?',
				description:
					'The $U token is the real time unit of value for the permaweb. With $U, users can efficiently access apps and services on the permaweb, and trade atomic assets on BazAR. Through BazAR, users can trade Alex artifact sponsorships and earn $U.',
				footer:
					'You can get $U by burning your own AR <a href="https://getu.arweave.dev/#/burn/" target="_blank" rel="noopener noreferrer">here</a> or by purchasing on <a href="https://everpay.io/" target="_blank" rel="noopener noreferrer">Everpay</a>',
			},
		},
		subnav: {
			header: `Trading`,
			howItWorks: 'How it works',
		},
	},
	transferred: `Transferred`,
	transferFailed: `Transfer failed`,
	transferFunds: `Transfer funds`,
	transferPoolFunds: `Transfer pool funds`,
	transferPoolFundsInfo: `Contributions must be transferred onto the network before you can mine artifacts. You can select the maximum amount or enter a custom amount in the form below.`,
	transferInitiated: `Transfer initiated`,
	type: `Type`,
	upload: `Upload`,
	uploadingFile: `Uploading file`,
	uploadImage: `Upload image`,
	uploadStatus: `Upload status`,
	updateMetadata: `Update metadata`,
	upvoted: `Upvoted`,
	urlCopied: `URL copied!`,
	uTokens: `$U`,
	value: `Value`,
	view: `View`,
	viewAccount: `View account`,
	viewAllContributions: `View all contributions`,
	viewDocs: `View docs`,
	viewOnArweave: `View on Arweave`,
	viewOnBazar: `View on BazAR`,
	viewOnPermafacts: `View on Permafacts`,
	viewPool: `View pool`,
	visitDocs: `Visit documentation`,
	volume: `Volume`,
	walletBalance: `Wallet balance`,
	walletNotConnected: `Connect a wallet to continue`,
	willBeReceiving: `You will be receiving`,
};
