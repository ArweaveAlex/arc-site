import React from 'react';
import { CollectionUploadType } from 'lib/clients/mint';

import { ASSETS } from 'helpers/config';
import * as windowUtils from 'helpers/window';
import { useQuery } from 'hooks/useQuery';
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

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');

	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

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

	async function handleSave() {
		if (arProvider.walletAddress) {
			try {
				// TODO: pick good images or have user upload, took this one from twitter
				let bannerImage = ASSETS.alexLogo;
				let thumbnailImage = ASSETS.alexLogo;

				const mimeTypeBanner = bannerImage ? bannerImage.split(';')[0].split(':')[1] : null;
				const mimeTypeThumb = thumbnailImage ? bannerImage.split(';')[0].split(':')[1] : null;

				const collection: CollectionUploadType = {
					name: title,
					title: title,
					description: description,
					topics: [topic],
					// TODO: select and generate license tags
					licenseTags: {
						License: 'yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8',
						Access: 'public',
					},
					owners: {
						[arProvider.walletAddress]: 100,
					},
					// TODO: put tag in framework
					type: 'document',
					code: '',
					creator: arProvider.walletAddress,
					items: selectedIds,
					banner: dataURLtoArrayBuffer(bannerImage),
					thumbnail: dataURLtoArrayBuffer(thumbnailImage),
					bannerMime: mimeTypeBanner,
					thumbnailMime: mimeTypeThumb,
				};

				const id = await mintProvider.mintClient.publishCollection({ collection: collection });
				console.log(`Collection id - ${id}`);
			} catch (e: any) {
				console.error(e);
			}
		}
	}

	function getData() {
		return (
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
