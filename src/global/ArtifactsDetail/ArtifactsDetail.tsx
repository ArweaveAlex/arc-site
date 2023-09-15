import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArtifactResponseType } from 'arcframework';

import { ArtifactsTable } from 'global/ArtifactsDetail/ArtifactsTable';
// import { getArtifactsByIds } from 'gql';
import * as windowUtils from 'helpers/window';
import { clearCursors } from 'state/cursors/actions';
import { RootState } from 'state/store';

import { IProps } from './types';

export default function ArtifactsDetail(props: IProps) {
	const dispatch = useDispatch();

	// const searchIdsReducer = useSelector((state: RootState) => state.searchIdsReducer);
	const searchTermReducer = useSelector((state: RootState) => state.searchTermReducer);

	const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);
	const [detailDataUpdated, setDetailDataUpdated] = React.useState<boolean>(false);

	const [cursor, setCursor] = React.useState<string | null>(null);
	const [searchRequested, setSearchRequested] = React.useState<boolean | null>(
		searchTermReducer[props.cursorObject.value].value !== '' &&
			searchTermReducer[props.cursorObject.value].id.value === props.id.value
			? true
			: null
	);
	const [showNoResults, setShowNoResults] = React.useState<boolean>(false);

	function handleShowNoResults() {
		setTimeout(() => {
			setShowNoResults(true);
		}, 100);
	}

	React.useEffect(() => {
		windowUtils.scrollTo(0, 0);
		dispatch(clearCursors());
	}, [dispatch]);

	// React.useEffect(() => {
	// 	(async function () {
	// 		setShowNoResults(false);
	// 		setDetailDataUpdated(!detailDataUpdated);
	// 		setDetailData(null);
	// 		if (
	// 			searchRequested &&
	// 			searchIdsReducer[props.cursorObject.value] &&
	// 			searchIdsReducer[props.cursorObject.value].length > 0
	// 		) {
	// 			setDetailData(
	// 				await getArtifactsByIds({
	// 					ids: null,
	// 					owner: null,
	// 					uploader: null,
	// 					cursor: cursor,
	// 					reduxCursor: props.cursorObject.value,
	// 				})
	// 			);
	// 		}
	// 	})();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [searchRequested, searchIdsReducer, cursor]);

	React.useEffect(() => {
		(async function () {
			setShowNoResults(false);
			setDetailDataUpdated(!detailDataUpdated);
			if (props.id.value && searchRequested === null) {
				setDetailData(null);
				setDetailData(
					await props.defaultFetch.fn({
						ids: props.defaultFetch.ids,
						owner: props.owner,
						uploader: props.uploader,
						cursor: cursor,
						reduxCursor: props.cursorObject.value,
					})
				);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchRequested, props.id.value, props.uploader, props.cursorObject.value, cursor]);

	// React.useEffect(() => {
	// 	if (
	// 		searchRequested &&
	// 		searchIdsReducer[props.cursorObject.value] &&
	// 		searchIdsReducer[props.cursorObject.value].length <= 0
	// 	) {
	// 		handleShowNoResults();
	// 		setDetailData({
	// 			nextCursor: null,
	// 			previousCursor: null,
	// 			count: 0,
	// 			contracts: [],
	// 		});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [detailDataUpdated]);

	React.useEffect(() => {
		if (detailData) {
			if (detailData.contracts.length <= 0) {
				handleShowNoResults();
			}
			if (props.setCount) {
				props.setCount(detailData.count);
			}
		}
	}, [detailData]);

	return (
		<ArtifactsTable
			id={props.id}
			indexIds={props.indexIds}
			data={detailData}
			showActions={props.showActions}
			showPoolIds={props.showPoolIds}
			showSearch={props.showSearch}
			handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
			cursors={{
				next: detailData?.nextCursor ?? null,
				previous: detailData?.previousCursor ?? null,
			}}
			owner={props.owner}
			cursorObject={props.cursorObject}
			setSearchRequested={(searchRequested: boolean) => setSearchRequested(searchRequested)}
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
