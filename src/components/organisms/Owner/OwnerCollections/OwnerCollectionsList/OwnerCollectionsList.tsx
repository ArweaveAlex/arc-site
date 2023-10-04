import React from 'react';
import { ReactSVG } from 'react-svg';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { formatAddress, getTxEndpoint, log } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { FormField } from 'components/atoms/FormField';
import { ListPlaceholder } from 'components/atoms/ListPlaceholder';
import { Modal } from 'components/molecules/Modal';
import { ASSETS, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import { ResponseType, ValidationType } from 'helpers/types';
import * as urls from 'helpers/urls';
import { CollectionType } from 'lib/clients/mint';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useOrderBookProvider } from 'providers/OrderBookProvider';

import * as S from './styles';
import { IProps } from './types';

function CollectionModal(props: { collection: CollectionType; handleClose: () => void }) {
	const arProvider = useArweaveProvider();
	const orProvider = useOrderBookProvider();

	const [price, setPrice] = React.useState<number>(0);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<ResponseType | null>(null);

	const [invalidPrice, _setInvalidPrice] = React.useState<ValidationType>({
		status: false,
		message: null,
	});

	function handlePriceInput(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value === '') {
			setPrice(NaN);
		} else {
			if (!isNaN(Number(e.target.value))) setPrice(parseFloat(e.target.value));
		}
	}

	async function handleSubmit() {
		if (arProvider.wallet && orProvider.orderBook) {
			try {
				const collectionObj = {
					collectionId: props.collection.id,
					price: price,
					percentage: 100,
				};
				setLoading(true);

				const signer = new InjectedArweaveSigner(arProvider.wallet);
				signer.getAddress = window.arweaveWallet.getActiveAddress;
				await signer.setPublicKey();

				let collectionManifest = await (await fetch(getTxEndpoint(collectionObj.collectionId))).json();
				let items = collectionManifest.items;
				let assetStates = {};

				for (let i = 0; i < items.length; i++) {
					let ar = orProvider.orderBook.env.arClient;
					let assetState = await ar.read(items[i]);
					let walletQty = assetState.balances[arProvider.walletAddress];
					assetStates[items[i]] = assetState;
					if (!walletQty) throw new Error(`You have no balance on asset ${items[i]}`);
				}

				for (let i = 0; i < items.length; i++) {
					try {
						let assetState = assetStates[items[i]];
						let walletQty = assetState.balances[arProvider.walletAddress];

						let intendedSaleQty = Math.ceil((collectionObj.percentage / 100) * walletQty);
						await orProvider.orderBook
							.sell({
								assetId: items[i],
								price: collectionObj.price * 1e6,
								qty: intendedSaleQty,
								wallet: signer,
								walletAddress: arProvider.walletAddress,
							})
							.catch((e: any) => console.error(e));
						log(`Listed artifact: ${items[i]}`, 0);
					} catch (e: any) {
						console.error(e);
					}
				}

				setResponse({
					status: true,
					message: `${language.success}!`,
				});
				setLoading(false);
			} catch (e: any) {
				setResponse({
					status: false,
					message: e.message,
				});
				setLoading(false);
			}
		}
	}

	return (
		<Modal header={language.collection.subheader1} handleClose={props.handleClose}>
			<S.LIHeaderContainer>
				<S.LIHeader1>{props.collection.title}</S.LIHeader1>
				<S.SubheaderFlex>
					<S.SubheaderContainer>
						<S.ID>
							<p>{formatAddress(props.collection.id, false)}</p>
						</S.ID>
					</S.SubheaderContainer>
				</S.SubheaderFlex>
			</S.LIHeaderContainer>
			<S.MFormWrapper>
				<S.Form onSubmit={handleSubmit}>
					<S.FormContainer>
						<FormField
							type={'number'}
							label={language.artifactListingPrice}
							value={isNaN(price) ? '' : price}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePriceInput(e)}
							disabled={loading || !arProvider.walletAddress}
							invalid={invalidPrice}
							tooltip={language.artifactListingPriceInfo}
						/>
					</S.FormContainer>

					<S.SubmitWrapper>
						<Button
							type={'alt2'}
							label={language.viewOnBazar}
							handlePress={() => window.open(REDIRECTS.bazar.collection(props.collection.id), '_blank')}
							disabled={false}
							noMinWidth
						/>
						<Button
							type={'alt1'}
							label={response ? response.message : language.createListings}
							handlePress={handleSubmit}
							noMinWidth
							loading={loading}
							disabled={loading || response !== null || !props.collection.id || !price}
						/>
					</S.SubmitWrapper>
				</S.Form>
			</S.MFormWrapper>
		</Modal>
	);
}

export default function OwnerCollectionsList(props: IProps) {
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [activeCollection, setActiveCollection] = React.useState<CollectionType | null>(null);

	function getData() {
		if (props.data !== null && props.data.length <= 0) {
			return (
				<S.EWrapper>
					<S.ELogo>
						<ReactSVG src={ASSETS.collections} />
					</S.ELogo>
					<S.ETitle>
						<S.H2>{language.collections}</S.H2>
					</S.ETitle>
					<S.EInfo>{language.createFirstCollection}</S.EInfo>
					<S.ELink>
						<ButtonLink type={'alt2'} label={language.create} href={`${urls.collectionsManage}?owner=${props.owner}`} />
					</S.ELink>
				</S.EWrapper>
			);
		} else {
			return (
				<>
					<S.Header>
						<S.HeaderFlex>
							<S.H2>{language.collections}</S.H2>
							{props.showCreateCollections && (
								<ButtonLink
									type={'alt1'}
									label={language.create}
									href={`${urls.collectionsManage}?owner=${props.owner}`}
									noMinWidth
								/>
							)}
						</S.HeaderFlex>
					</S.Header>

					{props.data ? (
						<S.List>
							{props.data.map((collection: CollectionType, index: number) => {
								return (
									<S.ListItemWrapper
										key={index}
										onClick={() => {
											setActiveCollection(collection);
											setShowModal(true);
										}}
									>
										<S.LIHeaderContainer>
											<S.LIHeader1>{collection.title}</S.LIHeader1>
											<S.SubheaderFlex>
												<S.SubheaderContainer>
													<S.ID>
														<p>{formatAddress(collection.id, false)}</p>
													</S.ID>
												</S.SubheaderContainer>
											</S.SubheaderFlex>
										</S.LIHeaderContainer>
										<S.LIBodyContainer>
											<S.LIBodyFlex>
												<S.LIBodyHeader>{language.description}</S.LIBodyHeader>
												<S.LIBodyData>{collection.description}</S.LIBodyData>
											</S.LIBodyFlex>
										</S.LIBodyContainer>
									</S.ListItemWrapper>
								);
							})}
						</S.List>
					) : (
						<ListPlaceholder rowCount={10} rowHeight={155} rowMargin={20} />
					)}
					{showModal && activeCollection && (
						<CollectionModal
							collection={activeCollection}
							handleClose={() => {
								setActiveCollection(null);
								setShowModal(false);
							}}
						/>
					)}
				</>
			);
		}
	}

	return <S.Wrapper>{getData()}</S.Wrapper>;
}
