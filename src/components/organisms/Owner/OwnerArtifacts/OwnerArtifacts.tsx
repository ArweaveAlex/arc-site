import React from 'react';
import { useDispatch } from 'react-redux';
import * as artifactActions from 'store/artifacts/actions';

import { ArtifactsDetail } from 'components/organisms/ArtifactsDetail';
import { getBookmarkIds } from 'gql';

import { IProps } from './types';

export default function OwnerArtifacts(props: IProps) {
	const dispatch = useDispatch();

	React.useEffect(() => {
		(async function () {
			const bookmarkIds = await getBookmarkIds(props.owner);
			dispatch(
				artifactActions.setBookmarks({
					owner: props.owner,
					ids: bookmarkIds,
				})
			);
		})();
	}, [props.owner]);

	return (
		<ArtifactsDetail
			id={{ value: props.owner, type: 'ownerId' }}
			fetchIds={props.ids}
			cursorObject={props.cursorObject}
			defaultFetch={{
				fn: props.fetch,
				ids: props.ids ? props.ids : null,
			}}
			showActions={props.showActions}
			showPoolIds={props.showPoolIds}
			showSearch={props.showSearch}
			ownerActionDisabled={props.ownerActionDisabled}
			owner={props.owner}
			uploaders={null}
			selectCallback={props.selectCallback}
			selectedCallbackIds={props.selectedCallbackIds}
			disabledSelectedCallbackIds={props.disabledSelectedCallbackIds}
			disabledContractSrc={props.disabledContractSrc}
			usePreviewModal={props.usePreviewModal}
			action={props.action}
			useIdPagination={props.useIdPagination}
		/>
	);
}
