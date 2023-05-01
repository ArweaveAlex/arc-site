const ARCONNECT_REDIRECT = 'https://www.arconnect.io/';
const ARWEAVE_APP_REDIRECT = 'https://arweave.app/welcome';
const DISCORD_REDIRECT = 'https://discord.gg/r3fj9m5AU5';

export const LANGUAGE = {
	about: `About`,
	aboutView: {
		header1: `Preserving`,
		header2: `Human History`,
		steps: {
			list: [
				{
					header: `Creating Pools`,
					description: `An operator creates a pool. A pool operator can be a historical institution, or anyone that is interested in preserving a topic.`,
					action: {
						label: `Learn About Creating`,
						href: `/create/`,
					},
				},
				{
					header: `Contributing to Pools`,
					description: `Users contribute Arweave tokens ($AR) to pools that they find valuable. These contributions pay for the storage space on Arweave.`,
					action: {
						label: `Learn About Contributing`,
						href: `/contribute/`,
					},
				},
				{
					header: `Preserve Artifacts`,
					description: `Pool operators can now collect artifacts. Documents, books, images, audio clips, videos, etc. within the pool are uploaded to Arweave. Since the artifacts are stored on Arweave, they cannot be changed or removed by anyone.`,
				},
				{
					header: `Collect Artifacts`,
					description: `Contributors will be made the sponsor of an amount of digital artifacts equal to the percentage of their $AR contribution (relative to the total $AR contributed).`,
				},
			],
		},
		subHeader1: `<p>Inspired by the Great Library of Alexandria, the mission of Alex. is to <span>preserve important historical artifacts</span> for the enrichment of all people.</p>`,
		subHeader2: `In order for humanity to move forward, we need to clearly see our past.`,
		detail: {
			artifactTypes: `Artifacts are currently being preserved from:`,
			action: `Learn How to Create`,
			section1: {
				header: 'Alex.',
				description: 'A decentralized archival platform that preserves human history and culture digitally. ',
				footer:
					'Alex. leverages the immutable and permanent data storage of Arweave. Institutions and creators are incentivized to publicly archive digital content by allowing anyone to become sponsors of their digital <b>artifacts</b>. Artifacts are grouped together into <b>pools</b>.',
			},
			section2: {
				header: 'What is a Pool?',
				description: 'A pool is a topic, event, or idea that can be digitally and publicly archived.',
				footer: 'Anyone can create a pool and earn rewards.',
			},
			section3: {
				header: 'What is an Artifact?',
				description:
					'An aritfact is a permanently preserved piece of digital content, including <b>documents</b>, <b>books</b>, <b>images</b>, <b>audio</b>, or <b>videos</b>.',
				footer: 'Artifacts are deployed as assets to Arweave and distributed to the contributors who support the pool.',
			},
		},
		infoDescription1: `<b>Archiving is important.</b> Archives allow people to look back at history to ensure better decisions are made for the future of society. Unfortunately, the current model for archiving is insufficiently incentivized. The person that stores the data, which others can later access without charge, is the person that has to pay. Alex. changes this by allowing the public to sponsor the archiving of digital content.`,
		infoDescription2: `Currently, historical archives are often controlled by a single centralized entity. This means that data can be manipulated or censored to benefit special interests. Therefore <b>Alex. uses Arweave to preserve important historical and cultural information</b> that may otherwise be lost, tampered with, or held hostage in a centralized server.`,
		infoHeader1: `Decentralized Archiving`,
		stepsHeader1: `How it works`,
		subnav: {
			decentralization: 'Decentralization',
			header: 'Alex. Ecosystem',
			howItWorks: 'How it works',
		},
	},
	artifactDetails: `Artifact Details`,
	artifactTypesDisplay: {
		files: `Personal Archives`,
		historical: `Historical Organizations`,
		nostr: `Nostr`,
		messaging: `Twitter`,
		reddit: `Reddit`,
		universities: `Universities`,
		webpage: `Wikipedia`,
	},
	artifactsCreated: `of Artifacts Created`,
	accept: `Accept`,
	account: {
		header1: `Account`,
		all: { title: `All` },
		collections: { title: `Collections` },
		new: { title: `New` },
		bookmarks: { title: `Bookmarks` },
		contributions: { title: `Contributions` },
	},
	actions: `Actions`,
	activePools: `Active Pools`,
	addtoBookmarks: `Add to Bookmarks`,
	amountExceedsBalance: `Amount exceeds Balance`,
	artifact: `Artifact`,
	artifactCount: `Artifact Count`,
	artifactGroup: `Artifact Group`,
	artifactPreview: `Artifact Preview`,
	artifactStamped: `Artifact Stamped`,
	artifacts: `Artifacts`,
	artifactDetail: {
		fileInformation: `File Information`,
		viewRaw: `View Raw`,
		tags: `Tags`,
		title: `Title`,
	},
	arTokens: `$AR`,
	availableBalance: `Available Balance`,
	banner: {
		header1: `A decentralized archival platform that preserves human history and culture digitally.`,
		subheader1: `Archives are permanently stored on`,
		subheader2: `Pools are created with the`,
	},
	basicInformation: `Basic Information`,
	bookmarks: `Bookmarks`,
	bookmarksUpdated: `Bookmarks Updated`,
	close: `Close`,
	closePreview: `Close Preview`,
	collection: {
		subheader1: `Collection`,
		success: `Collection saved!`,
		failure: `Collection failed to save.`,
	},
	collectionDetails: `Collection Details`,
	collectionNameAlreadyExists: `Collection Name already exists`,
	collections: `Collections`,
	comments: `Comments`,
	connect: `Connect`,
	connectWallet: `Connect Wallet`,
	connectionError: `Connection Error`,
	contribute: `Contribute`,
	contributeTo: `Contribute to`,
	contributeView: {
		header1: `Contribute to a pool`,
		subHeader1: `<p>Anyone can contribute to a pool, which pays for the storage costs of its <span>aritfacts</span>.`,
		subHeader2: `<b>Archiving is a public good</b>. Allowing people access to information about the past enables them to make higher
		quality decisions in the present. Currently, however, archiving is insufficiently incentivized: The person 
		that stores the data, which other's can later access without charge, is the person that has to pay.
		<b>Alex. changes this</b>. By allowing its community to become micro-sponsors of digital artifacts, an incentive is
		created for developers and creators to publically archive great digital works on Arweave.`,
		detail: {
			artifactTypes: `Artifacts are currently being preserved from:`,
			action: `Learn About Wallets`,
			section1: {
				header: 'What does it mean?',
				description:
					'Contributing means to send a portion of your <b>($AR)</b> to a pool. Contributions are used to pay for the storage costs of artifacts stored on Arweave. A portion of contributions also go to pool operators for their work.',
				footer: 'Artifacts are deployed as assets to Arweave and distributed to the contributors who support the pool.',
			},
			section2: {
				header: 'How to Contribute?',
				description1: `First, users will need an Arweave wallet with some <b>($AR)</b> in it to contribute. You can create a wallet at <a target="_blank" href=${ARCONNECT_REDIRECT}>arconnect.io</a> or <a target="_blank" href=${ARWEAVE_APP_REDIRECT}>arweave.app</a>. You can connect your wallet in Alex. by selecting <b>Connect Wallet</b> in the navigation menu.`,
				description2:
					'Next, you can select the <b>Contribute</b> button in any of the open pool pages. A window will appear which allows you to select the amount to contribute. This also shows the percentage of artifacts you will receive for contributing based on the amount of <b>($AR)</b> that you send.',
				description3:
					'After the contribution is received and the pool operator continues to mine artifacts, you will then be able to see your artifacts in your account.',
				description4: 'Learn more about how contributing works in our documentation.',
			},
			section3: {
				header: 'Why sponsor artifacts?',
				description:
					'Artifact sponsoring creates a new incentive for users to contribute to permanent archiving of digital content. <b>Anyone can contribute to pools and earn artifacts</b>. These artifacts can never be modified or removed as they are permanently stored on Arweave. Artifacts come in the form of documents, books, images, audio, videos, and more.',
			},
		},
		subnav: {
			header: `Contributing`,
			howItWorks: 'How it works',
		},
	},
	contributionMessage: `Your contribution totals will be adjusted once your transfer has settled on the Arweave network.`,
	contributionPercentage: (percentage: string) =>
		`* This Pool Operator will claim ${percentage}% of the contribution as a reward fee.`,
	contributions: `Contributions`,
	contributors: {
		recent: `Recent Contributors`,
		top: `Top Contributors`,
	},
	copied: `Copied!`,
	copyAddress: `Copy Address`,
	copyArtifactId: `Copy Artifact ID`,
	create: `Create`,
	createCollection: `Create a Collection`,
	createFirstCollection: `Create your first collection`,
	createView: {
		header1: `Create with Alex.`,
		steps: {
			header1: `How to create a pool`,
			header2: `For full documentation, please visit our Docs`,
			display: `Step`,
			list: [
				{
					header: `Think of a topic to archive`,
					description: `This can be a <span>historical event, current event, cultural topic, innovation, or anything that can be digitally preserved.</span> Once you have your topic, you must decide where you will mine the artifacts from. It can be from social media <span>(Twitter, Reddit, Nostr), websites (Wikipedia),</span> or your own <span>personal archive.</span>`,
				},
				{
					header: `Initiate the pool`,
					description: `By following our documentation you will have all of the steps needed to start the pool. This must be done via a CLI on a local machine because we aim to keep Alex. decentralized with no user data stored on our platform. If you do not have much experience with CLI’s or have any questions our dev team can assist you in our <a target="_blank" href=${DISCORD_REDIRECT}>Discord server</a>.`,
					action: {
						label: `Visit Pool Configuration`,
						href: `/docs/creating-a-pool/getting-started`,
					},
				},
				{
					header: `Configure the pool`,
					description: `This is where you will include all necessary information to display the pool on the pools page and start mining. This includes writing a description of the pool, including a header image, keywords, and determining the percentage of <span>($AR)</span> that will be collected from contributors. If social media channels will be mined, this step will also require inputting API keys.`,
				},
				{
					header: `Fund the pool`,
					description: `Once a pool is configured and created, <span>($AR)</span> is needed to store the artifacts and run the mining processes. Contributors are encouraged to send a portion of their <span>($AR)</span> to pools to become sponsors of artifacts.`,
					action: {
						label: `Learn About Contributing`,
						href: `/docs/contributing`,
					},
				},
				{
					header: `Start mining`,
					description: `If you are mining from social media, you can use the commands from the mining section of the documentation to see specific platforms and parameters. On the pools page you will start to see the artifact count grow. <span>The key to running a good pool that users want to contribute to is consistent and accurate mining based on the pool topic.</span>`,
					action: {
						label: `Visit Mining Configuration`,
						href: `/docs/creating-a-pool/mining-artifacts`,
					},
				},
			],
		},
		stepsHeader1: `How it works`,
		subHeader1: `<p>If you have an idea, topic or event that you would like to preserve forever, you can create a pool and earn <span>($AR)</span> for it.</p>`,
		subHeader2: `Anyone can create a pool with Alex. for any given topic/event. An operator creates a pool and mines artifacts into it. These artifacts are deployed as assets to Arweave and distributed to the contributors based on the amount of <b>$AR</b> contributed.`,
		subnav: {
			header: `Create with Alex.`,
			howItWorks: `How it works`,
		},
	},
	createdOn: `Created on`,
	dateCreated: `Date Created`,
	default: `Default`,
	details: `Details`,
	description: `Description`,
	disconnect: `Disconnect`,
	docsTitle: `Documentation`,
	editSelectedArtifacts: `Edit Selected Artifacts`,
	errorFetchingArtifact: `Error Fetching Artifact`,
	errorOccurred: `Error Occurred`,
	exit: `Exit`,
	exploreMore: `Explore More`,
	factMarket: `Fact Market`,
	factMarketCreated: `Fact Market Created`,
	fetching: `Fetching`,
	fetchingBalance: `Fetching balance`,
	fetchingCount: `Fetching count`,
	fetchingReceivingPercentage: `Fetching receiving amount`,
	invalidQuery: `Invalid Query`,
	landingView: {
		infoHeader1: `Contribute to a pool`,
		infoSubheader1: `Anyone can become a sponsor of artifacts.`,
		infoDescription1: `Pools are topics, events or ideas that are preserved digitally on Arweave. By contributing <b>($AR)</b> to pools, you pay for the storage space, and earn a stake in the artifacts mined into pools.`,
		infoAction1: `Learn How to Contribute`,
		infoHeader2: `Create a pool`,
		infoSubheader2: `Anyone can start preserving artifacts.`,
		infoDescription2: `Anyone can start their own pool on any topic or idea they choose and earn <b>($AR)</b> for archiving. As the pool operator you can control what artifacts are mined and how much you earn.`,
		infoAction2: `Learn How to Create`,
	},
	lastContribution: `Last Contribution`,
	library: {
		header1: `Library`,
		all: { title: `All` },
		new: { title: `New` },
		bookmarks: { title: `Bookmarks` },
	},
	loading: `Loading`,
	loadMore: `Load more`,
	mediaCaution: `Caution: Media may contain inappropriate content.`,
	messaging: {
		handle: `Handle`,
		message: `Message`,
		name: `Name`,
		originalPostDate: `Original Post Date`,
	},
	name: `Name`,
	next: `Next`,
	noArtifacts: `No Artifacts`,
	noContributions: `No Contributions`,
	ofArtifactsCreated: `of new Artifacts created`,
	openInNewTab: `Open in New Tab`,
	oppose: `Oppose`,
	owner: `Sponsor`,
	pageNotFound: `Page Not Found`,
	paths: {
		about: `About`,
		contribute: `Contribute`,
		create: `Create`,
		docs: `Docs`,
		pools: `Pools`,
	},
	pool: {
		subheader1: `Pool`,
		artifactsCreated: `Artifacts Created`,
		contribute: {
			notEnoughFunds: `Not enough AR to contribute to this pool.`,
			failed: `Failed to contribute to pool. Please try again.`,
			success: `Thank you for your contribution.`,
		},
	},
	poolOperator: `Alex. Pool Operator`,
	pools: {
		header1: `Pools`,
		gridTitles: {
			mostContributed: `Most Active`,
			newest: `Recently Added`,
		},
	},
	previewArtifact: `Preview Artifact`,
	previewCollection: `Preview Collection`,
	previous: `Previous`,
	publish: `Publish`,
	recentlyMintedArtifacts: `Recently Minted Artifacts`,
	receiving: `Receiving`,
	redditAuthor: `Posted by u/`,
	removeFromBookmarks: `Remove from Bookmarks`,
	save: `Save`,
	searchInitializing: `Initializing search`,
	select: `Select`,
	share: `Share`,
	shareArtifact: `Check out this Alex. Artifact !`,
	sharePool: `Check out this Alex. Pool !`,
	sharePools: `Check out these Alex. Pools !`,
	shareUrlLabel: `Share (Copy URL)`,
	showMoreReplies: `Show more replies`,
	siteTitle: `Alex.`,
	social: {
		discord: `Discord`,
		twitter: `Twitter`,
	},
	sortBy: `Sort By`,
	stamp: `STAMP`,
	stamps: `Stamps`,
	stampsVouched: `Vouched Stamps`,
	superStamp: `Super STAMP`,
	submit: `Submit`,
	support: `Support`,
	title: `Title`,
	topic: `Topic`,
	total: `Total`,
	totalContributed: `Total Contributed`,
	type: `Type`,
	upvoted: `Upvoted`,
	urlCopied: `URL Copied!`,
	view: `View`,
	viewAccount: `Account`,
	viewOnArweave: `View on Arweave`,
	viewOnPermafacts: `View on Permafacts`,
	viewPool: `View Pool`,
	visitDocs: `Visit Documentation`,
	walletNotConnected: `Connect a wallet to continue`,
	willBeReceiving: `You will be receiving`,
};
