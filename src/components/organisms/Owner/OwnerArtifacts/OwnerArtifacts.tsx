import { ArtifactsDetail } from 'components/organisms/ArtifactsDetail';

import { IProps } from './types';

export default function OwnerArtifacts(props: IProps) {
	return (
		<ArtifactsDetail
			id={{ value: props.owner, type: 'ownerId' }}
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
