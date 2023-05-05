import React from 'react';

import { FALLBACK_IMAGE, formatAddress, getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { LANGUAGE } from 'helpers/language';

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
	const [imageZoomed, setImageZoomed] = React.useState(false);

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
				} else {
					setMetadata({});
				}
			}
		})();
	}, [jsonData]);

	function handleImageZoom() {
		if (imageLoaded) {
			setImageZoomed(!imageZoomed);
		}
	}

	function getTitle() {
		if (props.data) {
			return (
				<>
					<S.Name>{props.data.artifactName}</S.Name>
					<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
				</>
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
		if (!imageZoomed) {
			return (
				<S.ImageWrapper onClick={() => handleImageZoom()}>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} />
				</S.ImageWrapper>
			);
		} else {
			return (
				<Modal header={null} handleClose={() => setImageZoomed(false)} noContainer zoom>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} />
				</Modal>
			);
		}
	}

	function getBodyWrapper(body: React.ReactNode) {
		return (
			<S.C2>
				<S.C2Header>
					<p>{LANGUAGE.artifactDetails}</p>
				</S.C2Header>
				<S.C2Body>{body}</S.C2Body>
			</S.C2>
		);
	}

	function getBody() {
		if (metadata && Object.keys(metadata).length > 0) {
			const body = Object.keys(metadata).map((key) => {
				return (
					<S.ContentLine key={key}>
						<S.InfoData>
							<span>{key}</span>
							<S.BodyData>{metadata[key]}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
				);
			});
			return getBodyWrapper(body);
		} else {
			if (metadata && Object.keys(metadata).length <= 0) {
				return null;
			} else {
				const body = Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
					return (
						<S.BP key={element}>
							<Loader placeholder />
						</S.BP>
					);
				});
				return getBodyWrapper(body);
			}
		}
	}

	return (
		<S.ICWrapper>
			<S.C1>
				<S.C1Content>
					<S.Title>{getTitle()}</S.Title>
					{getImage()}
				</S.C1Content>
			</S.C1>
			{getBody()}
		</S.ICWrapper>
	);
}
