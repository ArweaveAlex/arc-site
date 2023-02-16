import React from 'react';
import { useParams } from 'react-router-dom';

import { getArtifactById } from 'gql/artifacts';

import { ArtifactSingle } from './ArtifactSingle';

import { Loader } from 'components/atoms/Loader';

import * as window from 'helpers/window';
import { ArtifactDetailType } from 'helpers/types';

export default function Artifact() {
	const { id } = useParams();

	const [data, setData] = React.useState<ArtifactDetailType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (id) {
				window.scrollTo(0, 0);
				setData(await getArtifactById(id));
			}
		})();
	}, [id]);

	function getData() {
		if (data) {
			return <ArtifactSingle data={data} />;
		} else {
			return null;
		}
	}

	return data ? <>{getData()}</> : <Loader />;
}
