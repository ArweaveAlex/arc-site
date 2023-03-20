import React from 'react';
import { Link } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import { DOM, FALLBACK_IMAGE } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';
import { IProps } from './types';

export default function ImageListItem(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
	const [metadata, setMetadata] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const imageResponse = await fetch(
					getTxEndpoint(jsonData.fileTxId.length > 0 ? jsonData.fileTxId : FALLBACK_IMAGE)
				);
				setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
			}
		})();
	}, [jsonData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData && jsonData.metadataTxId && jsonData.metadataTxId.length > 0) {
				const metadataResponse = await fetch(getTxEndpoint(jsonData.metadataTxId));
				if (metadataResponse.status === 200) {
					setMetadata(JSON.parse(await (await fetch(metadataResponse.url)).text()));
				}
			}
		})();
	}, [jsonData]);

	function getColumnDisplay() {
		if (document.getElementById(DOM.preview)) {
			return true;
		} else {
			return false;
		}
	}

	function getTitle() {
		if (props.data) {
			return props.isListItem ? (
				<Link to={`${urls.artifact}${props.data.artifactId}`}>{props.data.artifactName}</Link>
			) : (
				<p>{props.data.artifactName}</p>
			);
		} else {
			return (
				<S.TP>
					<Loader placeholder />
				</S.TP>
			);
		}
	}

	function handleImageLoaded() {
		setImageLoaded(true);
	}

	function getImage() {
		return (
			<>
				{(!imageUrl || !imageLoaded) && <Loader placeholder />}
				<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} column={getColumnDisplay()} />
			</>
		);
	}

	function getBody() {
		if (metadata) {
			return (
				<>
					{Object.keys(metadata).map((key) => {
						return (
							<S.ContentLine key={key}>
								<S.InfoData>
									<span>{key}</span>
									<S.BodyData>{metadata[key]}</S.BodyData>
								</S.InfoData>
							</S.ContentLine>
						);
					})}
				</>
			);
		} else {
			return (
				<>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
						return (
							<S.BP key={element}>
								<Loader placeholder />
							</S.BP>
						);
					})}
				</>
			);
		}
	}

	return (
		<S.ICWrapper column={getColumnDisplay()}>
			<S.C1 column={getColumnDisplay()}>
				<S.C1Content column={getColumnDisplay()}>
					<S.Title column={getColumnDisplay()}>{getTitle()}</S.Title>
					<S.ImageWrapper column={getColumnDisplay()}>{getImage()}</S.ImageWrapper>
				</S.C1Content>
			</S.C1>
			<S.C2 column={getColumnDisplay()}>
				<S.C2Header>
					<p>{LANGUAGE.artifactDetails}</p>
				</S.C2Header>
				<S.C2Body column={getColumnDisplay()}>{getBody()}</S.C2Body>
			</S.C2>
		</S.ICWrapper>
	);
}
