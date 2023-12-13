import React from 'react';

import { logValue, TAGS } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { Loader } from 'components/atoms/Loader';
import { TradeDisclaimer } from 'components/atoms/TradeDisclaimer';
import { Modal } from 'components/molecules/Modal';
import { APP, ASSETS, DEFAULT_LICENSE, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import { ResponseType } from 'helpers/types';
import * as windowUtils from 'helpers/window';
import { useQuery } from 'hooks/useQuery';
import { CollectionUploadType } from 'lib/clients/mint';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useMintProvider } from 'providers/MintProvider';
import { WalletBlock } from 'wallet/WalletBlock';
import { Query } from 'wrappers/Query';

import { CollectionsManageArtifacts } from './CollectionsManageArtifacts';
import { CollectionsManageForm } from './CollectionsManageForm';
import { CollectionsManageHeader } from './CollectionsManageHeader';
import * as S from './styles';

export default function CollectionsManage() {
	const query = useQuery();
	const owner = query.get('owner');

	const arProvider = useArweaveProvider();
	const mintProvider = useMintProvider();

	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');

	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);
	const [showDisclaimer, setShowDisclaimer] = React.useState<boolean>(
		localStorage.getItem(APP.disclaimerShown) ? false : true
	);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [collectionResponse, setCollectionResponse] = React.useState<ResponseType | null>(null);
	const [responseId, setResponseId] = React.useState<string | null>(null);

	React.useEffect(() => {
		windowUtils.scrollTo(0, 0);
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	function dataURLtoArrayBuffer(dataURL: any) {
		const base64 = dataURL.split(',')[1];
		const binaryString = atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	}

	function handleClear() {
		setCollectionResponse(null);
		setTitle('');
		setTopic('');
		setDescription('');
		setSelectedIds([]);
	}

	async function handleSave() {
		if (arProvider.walletAddress) {
			setLoading(true);
			try {
				let thumbnailImage = ASSETS.siteLogo;
				const mimeTypeThumb = thumbnailImage ? thumbnailImage.split(';')[0].split(':')[1] : null;

				const collection: CollectionUploadType = {
					name: title,
					title: title,
					description: description,
					topics: [topic],
					licenseTags: DEFAULT_LICENSE,
					owners: {
						[arProvider.walletAddress]: 100,
					},
					type: TAGS.values.document,
					code: null,
					creator: arProvider.walletAddress,
					items: selectedIds,
					banner: null,
					thumbnail: dataURLtoArrayBuffer(thumbnailImage),
					bannerMime: null,
					thumbnailMime: mimeTypeThumb,
				};

				const id = await mintProvider.mintClient.publishCollection({ collection: collection });
				logValue(`Deployed Collection`, id, 0);
				setResponseId(id);
				setCollectionResponse({
					status: true,
					message: `${language.collectionCreated}!`,
				});
			} catch (e: any) {
				console.error(e);
				setCollectionResponse({
					status: false,
					message: language.errorOccurred,
				});
			}
			setLoading(false);
		}
	}

	function handleDisclaimerClose() {
		setShowDisclaimer(false);
		localStorage.setItem(APP.disclaimerShown, 'true');
	}

	function getData() {
		return (
			<>
				<S.Wrapper>
					<S.HeaderWrapper>
						<CollectionsManageHeader
							owner={owner}
							selectedIds={selectedIds}
							setSelectedIds={(ids: string[]) => setSelectedIds(ids)}
							title={title}
							topic={topic}
							description={description}
						/>
					</S.HeaderWrapper>
					<S.ContentWrapper>
						<S.ArtifactsWrapper>
							<CollectionsManageArtifacts
								owner={owner}
								selectedIds={selectedIds}
								setSelectedIds={(ids: string[]) => setSelectedIds(ids)}
							/>
						</S.ArtifactsWrapper>
						<S.FormWrapper>
							<CollectionsManageForm
								{...{ title, setTitle }}
								{...{ topic, setTopic }}
								{...{ description, setDescription }}
								selectedIds={selectedIds}
								handleSave={() => handleSave()}
							/>
						</S.FormWrapper>
					</S.ContentWrapper>
				</S.Wrapper>
				{showDisclaimer && <TradeDisclaimer handleClose={handleDisclaimerClose} />}
				{/* {collectionResponse && (
					<Notification
						type={collectionResponse.status ? 'success' : 'warning'}
						message={collectionResponse.message}
						callback={() => setCollectionResponse(null)}
					/>
				)} */}
				{(loading || collectionResponse) && (
					<Modal header={null} handleClose={() => setCollectionResponse(null)} closeHidden>
						<S.UploadingModalContainer>
							<h2>{loading ? language.creatingCollection : collectionResponse.message}</h2>
							<S.ModalBottomContainer>
								{loading ? (
									<S.ModalLoadingContainer>
										<Loader sm />
									</S.ModalLoadingContainer>
								) : (
									<S.ModalActionsContainer>
										{responseId && (
											<ButtonLink
												type={'primary'}
												label={language.viewOnBazar}
												href={REDIRECTS.bazar.collection(responseId)}
												targetBlank
											/>
										)}
										<Button type={'alt1'} label={language.close} handlePress={handleClear} />
									</S.ModalActionsContainer>
								)}
							</S.ModalBottomContainer>
						</S.UploadingModalContainer>
					</Modal>
				)}
			</>
		);
	}

	return arProvider.walletAddress ? (
		<Query value={'owner'} check={[arProvider.walletAddress]}>
			{getData()}
		</Query>
	) : (
		showWalletBlock && <WalletBlock />
	);
}
