import { ASSETS } from 'helpers/config';

import { language } from './language';
import * as urls from './urls';

export const NAV_PATHS = [
	{
		name: language.paths.about,
		href: urls.about,
		subpaths: [
			{
				name: language.paths.contribute,
				href: urls.contribute,
			},
			{
				name: language.paths.create,
				href: urls.create,
			},
			{
				name: language.paths.storage,
				href: urls.storage,
			},
			{
				name: language.paths.trade,
				href: urls.trade,
			},
		],
	},
	{
		name: language.paths.poolCreate,
		href: urls.poolsCreate,
	},
	{
		name: language.paths.pools,
		href: urls.pools,
	},
	{
		name: language.paths.docs,
		href: urls.docs,
	},
];

export const SOCIAL_PATHS = [
	{
		name: language.social.twitter,
		href: 'https://twitter.com/thealexarchive',
		svg: ASSETS.social.twitter,
	},
	{
		name: language.social.discord,
		href: 'http://discord.gg/2uZsWuTNvN',
		svg: ASSETS.social.discord,
	},
];

export const TWITTER_ACCOUNT_REDIRECT = (user: string) => `https://twitter.com/${user}`;
export const WALLET_INFO_REDIRECT = 'https://cookbook.arweave.dev/concepts/keyfiles-and-wallets.html';
