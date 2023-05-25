import React from 'react';

import { UserClient } from 'arcframework';

import { ArtifactsDetail } from 'global/ArtifactsDetail';

import { IProps } from './types';

export default function OwnerArtifacts(props: IProps) {
	const [poolIds, setPoolIds] = React.useState<string[] | null>(null);

	React.useEffect(() => {
		(async function () {
			if (props.owner) {
				const userClient = new UserClient({ userWalletAddress: props.owner });
				const contributions = await userClient.getUserContributions();

				const ids = contributions.map((contribution) => {
					return contribution.id;
				});

				setPoolIds(ids);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.owner]);

	return (
		<ArtifactsDetail
			id={{ value: props.owner, type: 'ownerId' }}
			indexIds={poolIds}
			cursorObject={props.cursorObject}
			defaultFetch={{
				fn: props.fetch,
				ids: props.ids ? props.ids : null,
			}}
			showActions={props.showActions}
			showPoolIds={props.showPoolIds}
			showSearch={props.showSearch}
			bookmarksDisabled={props.bookmarksDisabled}
			owner={props.owner}
			uploader={null}
			selectCallback={props.selectCallback}
			selectedCallbackIds={props.selectedCallbackIds}
			disabledSelectedCallbackIds={props.disabledSelectedCallbackIds}
			usePreviewModal={props.usePreviewModal}
			action={props.action}
		/>
	);
}
