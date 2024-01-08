import { getGQLData } from 'gql';
import { AR_PROFILE, GATEWAYS, PAGINATORS, STORAGE, TAGS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { AGQLResponseType, CursorEnum, FullProfileType, GQLNodeResponseType, ProfileType } from 'helpers/types';
import { getTagValue } from 'helpers/utils';

export async function getProfiles(args: { addresses: string[]; profileVersions?: string[] }): Promise<ProfileType[]> {
	let profiles: ProfileType[] = [];
	let gqlData: GQLNodeResponseType[] = [];

	const profileVersions = args.profileVersions ? args.profileVersions : [TAGS.values.profileVersions['1']];

	for (let i = 0; i < args.addresses.length; i += PAGINATORS.default) {
		const gqlResponse: AGQLResponseType = await getGQLData({
			gateway: GATEWAYS.arweave,
			ids: null,
			tagFilters: [
				{
					name: TAGS.keys.protocolName,
					values: profileVersions,
				},
			],
			owners: args.addresses.slice(i, i + PAGINATORS.default),
			cursor: null,
			reduxCursor: null,
			cursorObjectKey: CursorEnum.GQL,
		});

		gqlData = [...gqlData, ...gqlResponse.data];
	}

	profiles = args.addresses.map((address: string) => {
		const emptyProfile = {
			txId: null,
			channelTitle: null,
			handle: null,
			avatar: null,
			walletAddress: address,
			profileIndex: null,
			banner: null,
			twitter: null,
			discord: null,
		};

		const addressProfiles = gqlData.filter((element: GQLNodeResponseType) => {
			return element.node.owner.address === address;
		});

		if (addressProfiles && addressProfiles.length) {
			const gqlProfile = addressProfiles
				.sort((a: GQLNodeResponseType, b: GQLNodeResponseType) => {
					const aIndex = getTagValue(a.node.tags, TAGS.keys.profileIndex);
					const bIndex = getTagValue(b.node.tags, TAGS.keys.profileIndex);
					return parseInt(aIndex !== STORAGE.none ? aIndex : '0') - parseInt(bIndex !== STORAGE.none ? bIndex : '0');
				})
				.reverse()[0];

			let currentIndex = '0';
			const profileIndex = getTagValue(gqlProfile.node.tags, TAGS.keys.profileIndex);
			if (profileIndex !== STORAGE.none) currentIndex = profileIndex;

			let handle = null;
			let handleTag = getTagValue(gqlProfile.node.tags, TAGS.keys.handle);
			if (handleTag !== STORAGE.none) handle = handleTag;
			else {
				handleTag = getTagValue(gqlProfile.node.tags, TAGS.keys.handle.toLowerCase());
				if (handleTag !== STORAGE.none) handle = handleTag;
			}

			let avatar = null;
			const avatarTag = getTagValue(gqlProfile.node.tags, TAGS.keys.avatar);
			if (avatarTag !== STORAGE.none) avatar = avatarTag.replace('ar://', '');

			let banner = null;
			const bannerTag = getTagValue(gqlProfile.node.tags, TAGS.keys.banner);
			if (bannerTag !== STORAGE.none) banner = bannerTag.replace('ar://', '');

			if (gqlProfile) {
				return {
					txId: gqlProfile ? gqlProfile.node.id : null,
					channelTitle: null,
					handle: handle,
					avatar: avatar,
					walletAddress: address,
					profileIndex: currentIndex,
					banner: banner,
					twitter: null,
					discord: null,
				};
			} else {
				return emptyProfile;
			}
		} else {
			return emptyProfile;
		}
	});

	return profiles;
}

export async function getCurrentProfile(args: { address: string }): Promise<ProfileType | null> {
	try {
		const fetchedProfiles = await getProfiles({ addresses: [args.address] });
		if (fetchedProfiles && fetchedProfiles.length) return fetchedProfiles[0];
		else return null;
	} catch (e: any) {
		console.error(e);
		return null;
	}
}

export async function getFullProfile(args: { address: string }): Promise<FullProfileType> {
	const emptyProfile = {
		txId: null,
		channelTitle: null,
		handle: null,
		avatar: null,
		walletAddress: args.address,
		profileIndex: null,
		banner: null,
		twitter: null,
		discord: null,
		bio: null,
	};
	try {
		const currentProfile = await getCurrentProfile({ address: args.address });
		if (currentProfile && currentProfile.txId) {
			const response = await fetch(getTxEndpoint(currentProfile.txId));
			if (response && response.ok) {
				const responseJson = await response.json();

				let avatar = null;
				if (responseJson.avatar) {
					if (responseJson.avatar.replace('ar://', '') === AR_PROFILE.defaultAvatar) avatar = null;
					else avatar = responseJson.avatar;
				}

				let banner = null;
				if (responseJson.banner) {
					if (responseJson.banner.replace('ar://', '') === AR_PROFILE.defaultBanner) banner = null;
					else banner = responseJson.banner;
				}

				const fullProfile = {
					txId: currentProfile.txId,
					channelTitle: responseJson.channelTitle ?? null,
					handle: responseJson.handle ?? null,
					avatar: avatar,
					walletAddress: args.address,
					profileIndex: responseJson.profileIndex ?? currentProfile.profileIndex ?? 1,
					banner: banner,
					twitter: responseJson.links && responseJson.links.twitter ? responseJson.links.twitter : null,
					discord: responseJson.links && responseJson.links.discord ? responseJson.links.discord : null,
					bio: responseJson.bio ?? null,
				};
				return fullProfile as FullProfileType;
			} else {
				return emptyProfile;
			}
		} else {
			return emptyProfile;
		}
	} catch (e: any) {
		console.error(e);
		return emptyProfile;
	}
}
