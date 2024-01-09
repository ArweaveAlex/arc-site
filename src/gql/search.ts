import { getGQLData } from 'gql';
import { GATEWAYS, TAGS } from 'helpers/config';
import { AGQLResponseType, CursorEnum } from 'helpers/types';
import { checkAddress } from 'helpers/utils';

export async function search(args: { term: string; cursor: string | null }): Promise<AGQLResponseType | null> {
	const emptyResponseObject = {
		data: [],
		count: 0,
		nextCursor: null,
		previousCursor: null,
	};
	try {
		const addressCheck = checkAddress(args.term);
		let tagFilters = [
			{
				name: TAGS.keys.appType,
				values: [TAGS.values.poolVersions['1.2'], TAGS.values.poolVersions['1.4'], TAGS.values.poolVersions['1.5']],
			},
			{ name: TAGS.keys.poolName, values: [args.term], match: 'FUZZY_OR' },
		];

		let gqlResponse: AGQLResponseType = await getGQLData({
			gateway: GATEWAYS.goldsky,
			ids: addressCheck ? [args.term] : null,
			tagFilters: addressCheck ? null : tagFilters,
			owners: null,
			cursor: args.cursor,
			reduxCursor: null,
			cursorObjectKey: CursorEnum.GQL,
		});

		if (gqlResponse && gqlResponse.data && !gqlResponse.data.length) {
			tagFilters = [
				{ name: TAGS.keys.artifactSeries, values: [TAGS.values.artifactSeries] },
				{ name: TAGS.keys.ansTitle, values: [args.term], match: 'FUZZY_OR' },
			];

			gqlResponse = await getGQLData({
				gateway: GATEWAYS.goldsky,
				ids: addressCheck ? [args.term] : null,
				tagFilters: addressCheck ? null : tagFilters,
				owners: null,
				cursor: args.cursor,
				reduxCursor: null,
				cursorObjectKey: CursorEnum.GQL,
			});
		}

		if (gqlResponse && gqlResponse.data && gqlResponse.data.length) {
			return gqlResponse;
		} else return emptyResponseObject;
	} catch (e: any) {
		console.error(e);
		return emptyResponseObject;
	}
}
