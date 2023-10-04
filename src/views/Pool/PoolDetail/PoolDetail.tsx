import { ArtifactsDetail } from 'components/organisms/ArtifactsDetail';
import { getArtifactsByPool } from 'gql';

import { IProps } from './types';

export default function PoolDetail(props: IProps) {
	return (
		<ArtifactsDetail
			id={props.id}
			cursorObject={props.cursorObject}
			defaultFetch={{
				ids: [props.id.value],
				fn: getArtifactsByPool,
			}}
			showActions={true}
			showPoolIds={false}
			showSearch={false}
			ownerActionDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			owner={null}
			uploader={props.uploader}
			usePreviewModal={true}
			setCount={props.setCount ? props.setCount : null}
			disabledContractSrc={false}
			useIdPagination={false}
		/>
	);
}
