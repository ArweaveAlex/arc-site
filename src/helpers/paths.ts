import { ASSETS } from 'helpers/config';

import { language } from './language';
import * as urls from './urls';

export const NAV_PATHS = [
	{
		name: language.paths.about,
		href: urls.about,
	},
	{
		name: language.paths.contribute,
		href: urls.contribute,
	},
	{
		name: language.paths.create,
		href: urls.create,
	},
	{
		name: language.paths.docs,
		href: urls.docs,
	},
	{
		name: language.paths.pools,
		href: urls.pools,
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
		href: 'https://discord.gg/r3fj9m5AU5',
		svg: ASSETS.social.discord,
	},
];

export const TWITTER_ACCOUNT_REDIRECT = (user: string) => `https://twitter.com/${user}`;
export const WALLET_INFO_REDIRECT = 'https://cookbook.arweave.dev/concepts/keyfiles-and-wallets.html';
