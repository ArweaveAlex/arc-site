import React from 'react';
import { useParams } from 'react-router-dom';

import { ArtifactDetailType, getArtifactById } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import * as windowUtils from 'helpers/window';

import { ArtifactSingle } from './ArtifactSingle';

export default function Artifact() {
	const { id } = useParams();

	const [data, setData] = React.useState<ArtifactDetailType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (id) {
				windowUtils.scrollTo(0, 0);
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
