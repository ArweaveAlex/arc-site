import React from 'react';
import { useParams } from 'react-router-dom';

<<<<<<< HEAD:src/views/Artifact/ArtifactThread/ArtifactThread.tsx
import { getArtifactsByAssociation } from 'gql/artifacts';
import { AssociationDetailType, SequenceType } from 'helpers/types';
=======
import { AssociationDetailType, getArtifactsByAssociation, SequenceType } from 'arcframework';

>>>>>>> dev:src/views/Artifact/ArtifactThread/index.tsx
import * as windowUtils from 'helpers/window';

import { ArtifactList } from './ArtifactList';

const SEQUENCE_ITERATION = 5;

export default function ArtifactThread() {
	const { associationId } = useParams();

	const [data, setData] = React.useState<AssociationDetailType | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [sequence, setSequence] = React.useState<SequenceType>({
		start: SEQUENCE_ITERATION - (SEQUENCE_ITERATION - 1) - 1,
		end: SEQUENCE_ITERATION - 1,
	});

	function updateSequence() {
		setSequence({
			start: sequence.start + SEQUENCE_ITERATION,
			end: sequence.end + SEQUENCE_ITERATION,
		});
	}

	React.useEffect(() => {
		(async function () {
			if (associationId) {
				setLoading(true);
				if (!data) {
					windowUtils.scrollTo(0, 0);
					setData(await getArtifactsByAssociation(associationId, sequence));
				} else {
					const associationDetail = await getArtifactsByAssociation(associationId, sequence);
					setData({
						artifacts: [...data.artifacts, ...associationDetail.artifacts],
						length: associationDetail.length,
					});
				}
				setLoading(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [associationId, sequence]);

	return (
		<ArtifactList
			data={data ? data.artifacts : null}
			loading={loading}
			updateSequence={updateSequence}
			updateDisabled={data ? sequence.end >= data.length : true}
		/>
	);
}
