import { ArtifactsDetail } from "global/ArtifactsDetail";

import { getArtifactsByPool } from "gql/artifacts";

import { IProps } from "./types";

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
			showCollections={false}
			showPoolIds={false}
			selectCallback={null}
			selectedCallbackIds={null}
			owner={null}
			uploader={props.uploader}
		/>
	);
}
