import React from 'react';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { ArtifactsDetail } from 'components/organisms/ArtifactsDetail';
import { getArtifactsByPool } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

export default function PoolManageView() {
	const { id } = useParams();

	const [headerData, setHeaderData] = React.useState<ArcFramework.PoolType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (id) {
				setHeaderData(await ArcFramework.getPoolById(id));
			}
		})();
	}, [id]);

	return headerData ? (
		<ArtifactsDetail
			id={{ value: id, type: 'poolId' }}
			cursorObject={{
				key: ArcFramework.CursorEnum.IdGQL,
				value: REDUX_TABLES.poolAll,
			}}
			defaultFetch={{
				ids: [id],
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
			uploader={headerData.state.owner}
			usePreviewModal={true}
			disabledContractSrc={false}
			useIdPagination={false}
		/>
	) : null;
}
