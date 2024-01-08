import React from 'react';
import { useParams } from 'react-router-dom';

import { ArtifactDetailType, getArtifactById } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';

import { ArtifactSingle } from './ArtifactSingle';

export default function Artifact() {
	const { id } = useParams();

	const [data, setData] = React.useState<ArtifactDetailType | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (id) {
				windowUtils.scrollTo(0, 0);
				try {
					setLoading(true);
					const artifact = await getArtifactById(id);
					setData(artifact);
					setLoading(false);
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [id]);

	function getData() {
		if (loading) return <Loader />;
		if (data) {
			return <ArtifactSingle data={data} />;
		} else {
			return (
				<div className={'wrapper-600'}>
					<span>{language.artifactNotFound}</span>
				</div>
			);
		}
	}

	return getData();
}
