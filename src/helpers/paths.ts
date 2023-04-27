import { ASSETS } from 'helpers/config';

import { LANGUAGE } from './language';
import * as urls from './urls';

export const NAV_PATHS = [
	{
		name: LANGUAGE.paths.about,
		href: urls.about,
	},
	{
		name: LANGUAGE.paths.contribute,
		href: urls.contribute,
	},
	{
		name: LANGUAGE.paths.create,
		href: urls.create,
	},
	{
		name: LANGUAGE.paths.pools,
		href: urls.pools,
	},
];

export const SOCIAL_PATHS = [
	{
		name: LANGUAGE.social.twitter,
		href: 'https://twitter.com/thealexarchive',
		svg: ASSETS.social.twitter,
	},
	{
		name: LANGUAGE.social.discord,
		href: 'https://discord.gg/r3fj9m5AU5',
		svg: ASSETS.social.discord,
	},
];

export const OPERATOR_REDIRECT = 'https://alex-operator-guide.arweave.dev/';
export const TWITTER_ACCOUNT_REDIRECT = (user: string) => `https://twitter.com/${user}`;
export const WALLET_INFO_REDIRECT = 'https://cookbook.arweave.dev/concepts/keyfiles-and-wallets.html';
