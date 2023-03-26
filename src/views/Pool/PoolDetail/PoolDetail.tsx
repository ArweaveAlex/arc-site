import { ArtifactsDetail } from 'global/ArtifactsDetail';
<<<<<<< HEAD
import { getArtifactsByPool } from 'gql/artifacts';
=======
import { getArtifactsByPool } from 'gql';
>>>>>>> dev

import { IProps } from './types';

export default function PoolDetail(props: IProps) {
	return (
		<ArtifactsDetail
			id={props.id}
			indexIds={[props.id.value]}
			cursorObject={props.cursorObject}
			defaultFetch={{
				ids: [props.id.value],
				fn: getArtifactsByPool,
			}}
			showActions={true}
			showPoolIds={false}
			showSearch={false}
			bookmarksDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			owner={null}
			uploader={props.uploader}
			usePreviewModal={true}
		/>
	);
}
