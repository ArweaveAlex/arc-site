import React from 'react';
import { useDispatch } from 'react-redux';

import { getTagValue, STORAGE, TAGS } from 'arcframework';

import { ArtifactsTable } from 'components/organisms/ArtifactsDetail/ArtifactsTable';
import { getGQLData } from 'gql';
import { GATEWAYS, PAGINATORS } from 'helpers/config';
import {
	AGQLResponseType,
	CursorObjectType,
	GQLArgsType,
	GQLNodeResponseType,
	IdPaginatorType,
	UserArtifactsArgsType,
} from 'helpers/types';
import * as windowUtils from 'helpers/window';
import { clearCursors } from 'store/cursors/actions';

import { IProps } from './types';

export default function ArtifactsDetail(props: IProps) {
	const dispatch = useDispatch();

	const [detailData, setDetailData] = React.useState<AGQLResponseType | null>(null);
	const [detailDataUpdated, setDetailDataUpdated] = React.useState<boolean>(false);

	const [cursor, setCursor] = React.useState<string | null>(null);
	const [paginatedIds, setPaginatedIds] = React.useState<IdPaginatorType[] | null>(null);
	const [showNoResults, setShowNoResults] = React.useState<boolean>(false);

	const [currentCursorObject, setCurrentCursorObject] = React.useState<CursorObjectType | null>(null);
	const [currentCursorUpdate, setCurrentCursorUpdate] = React.useState<string>(STORAGE.none);

	const [filteredArtifactTypes, setFilteredArtifactTypes] = React.useState<string[]>([]);

	React.useEffect(() => {
		windowUtils.scrollTo(0, 0);
		dispatch(clearCursors());
	}, [dispatch]);

	React.useEffect(() => {
		if (!currentCursorObject || currentCursorObject.value !== props.cursorObject.value) {
			setDetailData(null);
			setCurrentCursorObject(props.cursorObject);
			setPaginatedIds(null);
		}
		if (currentCursorUpdate === STORAGE.none || currentCursorUpdate !== cursor) {
			setDetailData(null);
			setCurrentCursorUpdate(cursor);
			setPaginatedIds(null);
		}
	}, [props.cursorObject, cursor]);

	React.useEffect(() => {
		(async function () {
			if (!paginatedIds && props.useIdPagination) {
				const defaultFetch = props.defaultFetch.fn as (args: UserArtifactsArgsType) => Promise<string[]>;
				const paginatedIdsObject: IdPaginatorType[] = [];
				let ids: string[] = [];

				if (props.fetchIds) {
					ids = [...props.fetchIds];
				} else {
					ids = await defaultFetch({
						walletAddress: props.owner,
						fetchType: 'all',
					});
				}

				if (ids && ids.length > 0) {
					for (let i = 0, j = 0; i < ids.length; i += PAGINATORS.default, j++) {
						paginatedIdsObject.push({
							index: `${props.cursorObject.value}-${j}`,
							ids: [...ids].slice(i, i + PAGINATORS.default),
						});
					}
				} else {
					setDetailData({
						data: [],
						count: 0,
						nextCursor: null,
						previousCursor: null,
					});
				}

				setPaginatedIds(paginatedIdsObject);
			}
		})();
	}, [props.cursorObject, paginatedIds, props.useIdPagination, cursor]);

	React.useEffect(() => {
		(async function () {
			if (props.useIdPagination) {
				if (paginatedIds && paginatedIds.length) {
					let cursorObject: any;
					if (cursor) {
						cursorObject = paginatedIds.find((element: IdPaginatorType) => element.index === cursor);
						if (!cursorObject) cursorObject = paginatedIds[0];
					}

					let currentFetchIds: any;
					currentFetchIds = cursor ? (cursorObject && cursorObject.ids ? cursorObject.ids : []) : paginatedIds[0].ids;

					setDetailData(
						(await getGQLData({
							gateway: GATEWAYS.arweave,
							ids: currentFetchIds,
							tagFilters: null,
							owners: null,
							cursor: null,
							reduxCursor: props.cursorObject.value,
							cursorObjectKey: props.cursorObject.key,
						})) as AGQLResponseType
					);
				}
			}
		})();
	}, [props.useIdPagination, paginatedIds, cursor]);

	React.useEffect(() => {
		(async function () {
			if (!props.useIdPagination) {
				console.log(5);
				setDetailData(null);
				setShowNoResults(false);
				setDetailDataUpdated(!detailDataUpdated);

				const defaultFetch = props.defaultFetch.fn as (args: GQLArgsType) => Promise<AGQLResponseType>;

				let owners: string[] | null = null;
				if (props.owner) owners = [props.owner];
				if (props.uploaders) owners = owners ? [...owners, ...props.uploaders] : props.uploaders;

				setDetailData(
					(await defaultFetch({
						gateway: GATEWAYS.goldsky,
						ids: props.defaultFetch.ids,
						tagFilters: filteredArtifactTypes
							? [{ name: TAGS.keys.artifactType, values: filteredArtifactTypes }]
							: null,
						owners: owners,
						cursor: cursor,
						reduxCursor: props.cursorObject.value,
						cursorObjectKey: props.cursorObject.key,
					})) as AGQLResponseType
				);
			}
		})();
	}, [props.uploaders, props.cursorObject.value, cursor, filteredArtifactTypes]);

	// GQL Error if count is sent in query with a cursor
	React.useEffect(() => {
		if (detailData && detailData.data.length <= 0) {
			handleShowNoResults();
		}
		if (detailData && !cursor && !filteredArtifactTypes.length) {
			if (props.setCount) {
				props.setCount(detailData.count);
			}
		}
	}, [detailData, cursor]);

	React.useEffect(() => {
		if (props.setArtifacts && detailData !== null && detailData.data.length) {
			const sortedArtifacts: GQLNodeResponseType[] = [...detailData.data].sort((a, b) => {
				const dateA = getTagValue(a.node.tags, TAGS.keys.dateCreated);
				const dateB = getTagValue(b.node.tags, TAGS.keys.dateCreated);

				return Number(dateB) - Number(dateA);
			});

			props.setArtifacts.fn(sortedArtifacts.slice(0, props.setArtifacts.count));
		}
	}, [detailData, props.setArtifacts]);

	function handleShowNoResults() {
		setTimeout(() => {
			setShowNoResults(true);
		}, 100);
	}

	function getCursors() {
		if (props.useIdPagination && paginatedIds && paginatedIds.length) {
			const cursorObject = paginatedIds.find((element: IdPaginatorType) => element.index === cursor);
			if (!cursorObject) {
				return {
					next: paginatedIds.length > 1 ? paginatedIds[1].index : null,
					previous: null,
				};
			} else {
				const index = paginatedIds.indexOf(cursorObject);
				return {
					next: index >= paginatedIds.length - 1 ? null : paginatedIds[index + 1].index,
					previous: index > 0 ? paginatedIds[index - 1].index : null,
				};
			}
		} else {
			return {
				next: detailData?.nextCursor ?? null,
				previous: detailData?.previousCursor ?? null,
			};
		}
	}

	function handleFilterUpdate(artifactTypes: string[]) {
		setFilteredArtifactTypes(artifactTypes);
		dispatch(clearCursors());
		setCursor(null);
	}

	return (
		<ArtifactsTable
			id={props.id}
			data={detailData}
			showActions={props.showActions}
			showPoolIds={props.showPoolIds}
			showSearch={props.showSearch}
			handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
			cursors={getCursors()}
			owner={props.owner}
			cursorObject={props.cursorObject}
			showNoResults={showNoResults}
			ownerActionDisabled={props.ownerActionDisabled}
			selectCallback={props.selectCallback}
			selectedCallbackIds={props.selectedCallbackIds}
			disabledSelectedCallbackIds={props.disabledSelectedCallbackIds}
			disabledContractSrc={props.disabledContractSrc}
			usePreviewModal={props.usePreviewModal}
			setFilteredArtifactTypes={(artifactTypes: string[]) => handleFilterUpdate(artifactTypes)}
			currentFilteredArtifactTypes={filteredArtifactTypes}
			filterDisabled={props.useIdPagination}
			action={props.action}
		/>
	);
}
