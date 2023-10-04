import React from 'react';
import { useDispatch } from 'react-redux';

import {
	ArtifactArgsType,
	ArtifactResponseType,
	getTagValue,
	PAGINATOR,
	TAGS,
	UserArtifactsArgsType,
} from 'arcframework';

import { ArtifactsTable } from 'components/organisms/ArtifactsDetail/ArtifactsTable';
import { getArtifactsByIds } from 'gql';
import { IdPaginatorType } from 'helpers/types';
import * as windowUtils from 'helpers/window';
import { clearCursors } from 'state/cursors/actions';

import { IProps } from './types';

export default function ArtifactsDetail(props: IProps) {
	const dispatch = useDispatch();

	const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);
	const [detailDataUpdated, setDetailDataUpdated] = React.useState<boolean>(false);

	const [cursor, setCursor] = React.useState<string | null>(null);
	const [paginatedIds, setPaginatedIds] = React.useState<IdPaginatorType[] | null>(null);
	const [showNoResults, setShowNoResults] = React.useState<boolean>(false);

	React.useEffect(() => {
		windowUtils.scrollTo(0, 0);
		dispatch(clearCursors());
	}, [dispatch]);

	React.useEffect(() => {
		(async function () {
			if (props.useIdPagination) {
				const defaultFetch = props.defaultFetch.fn as (args: UserArtifactsArgsType) => Promise<string[]>;

				if (!paginatedIds) {
					const paginatedIdsObject: IdPaginatorType[] = [];

					const ids = await defaultFetch({
						walletAddress: props.owner,
						fetchType: 'all',
					});

					if (ids && ids.length > 0) {
						for (let i = 0, j = 0; i < ids.length; i += PAGINATOR, j++) {
							paginatedIdsObject.push({
								index: `${props.cursorObject.value}-${j}`,
								ids: [...ids].slice(i, i + PAGINATOR),
							});
						}
					}

					setPaginatedIds(paginatedIdsObject);
				}
			}
		})();
	}, [props.useIdPagination, cursor]);

	React.useEffect(() => {
		(async function () {
			if (props.useIdPagination && paginatedIds && paginatedIds.length) {
				setDetailData(null);
				const currentFetchIds = cursor
					? paginatedIds.find((element: IdPaginatorType) => element.index === cursor).ids
					: paginatedIds[0].ids;

				setDetailData(
					await getArtifactsByIds({
						ids: currentFetchIds,
						owner: null,
						uploader: null,
						cursor: null,
						reduxCursor: null,
					})
				);
			}
		})();
	}, [props.useIdPagination, paginatedIds, cursor]);

	React.useEffect(() => {
		(async function () {
			if (!props.useIdPagination) {
				setDetailData(null);
				setShowNoResults(false);
				setDetailDataUpdated(!detailDataUpdated);
				const defaultFetch = props.defaultFetch.fn as (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
				setDetailData(
					(await defaultFetch({
						ids: props.defaultFetch.ids,
						owner: props.owner,
						uploader: props.uploader,
						cursor: cursor,
						reduxCursor: props.cursorObject.value,
					})) as ArtifactResponseType
				);
			}
		})();
	}, [props.uploader, props.cursorObject.value, cursor]);

	// GQL Error if count is sent in query with a cursor
	React.useEffect(() => {
		if (detailData && !cursor) {
			if (detailData.contracts.length <= 0) {
				handleShowNoResults();
			}
			if (props.setCount) {
				props.setCount(detailData.count);
			}
		}
	}, [detailData, cursor]);

	React.useEffect(() => {
		if (props.setArtifacts && detailData !== null && detailData.contracts.length) {
			const sortedArtifacts = [...detailData.contracts].sort((a, b) => {
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
			action={props.action}
		/>
	);
}
