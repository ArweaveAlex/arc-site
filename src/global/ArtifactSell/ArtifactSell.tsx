import React from 'react';

import { ArweaveClient, formatAddress, formatDate, ValidationType } from 'arcframework';
import { OrderBook, OrderBookType } from 'permaweb-orderbook';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: notification
export default function ArtifactSell(props: IProps) {
	const arProvider = useArweaveProvider();

	const arClient = new ArweaveClient();

	const [orderBook, setOrderBook] = React.useState<OrderBookType>();
	const [amount, setAmount] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [copied, setCopied] = React.useState<boolean>(false);

	React.useEffect(() => {
		setOrderBook(
			OrderBook.init({
				currency: 'U',
				wallet: 'use_wallet',
				arweaveGet: arClient.arweaveGet,
				arweavePost: arClient.arweavePost,
				warp: arClient.warpDefault,
			})
		);
	}, []);

	async function handleSell(e: any) {
		e.preventDefault();
		setLoading(true);

		const orderTx = await orderBook.sell({
			assetId: props.artifactId,
			price: amount * 1e6,
			qty: 1,
		});

		console.log(orderTx);
		setLoading(false);
	}

	const copyAddress = React.useCallback(async () => {
		if (props.artifactId) {
			if (props.artifactId.length > 0) {
				await navigator.clipboard.writeText(props.artifactId);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.artifactId]);

	function getInvalidForm(): ValidationType {
		return { status: false, message: null };
	}

	function getDisabledSubmit() {
		return getInvalidForm().status || loading || !arProvider.walletAddress || isNaN(amount) || amount <= 0;
	}

	function getSubheader() {
		return (
			<S.SubheaderFlex>
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{language.artifact}</p>
					</S.Subheader1>
					&nbsp;
					<S.ID>
						<p>{props.artifactId ? formatAddress(props.artifactId, false) : null}</p>
						<IconButton type={'primary'} src={ASSETS.copy} handlePress={copyAddress} sm />
						{copied && (
							<S.IDCopied>
								<p>{language.copied}</p>
							</S.IDCopied>
						)}
					</S.ID>
				</S.SubheaderContainer>
				&nbsp; &nbsp;
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{language.createdOn}</p>
					</S.Subheader1>
					&nbsp;
					<S.Subheader2>
						<p>{props.dateCreated ? formatDate(props.dateCreated, 'epoch') : null}</p>
					</S.Subheader2>
				</S.SubheaderContainer>
			</S.SubheaderFlex>
		);
	}

	return (
		<Modal header={language.sellArtifact} handleClose={props.handleClose}>
			<S.ModalWrapper>
				<S.Header>
					<S.HeaderFlex>
						<S.Header1>{props.artifactName}</S.Header1>
					</S.HeaderFlex>
					{getSubheader()}
				</S.Header>
				<S.Form onSubmit={(e) => handleSell(e)}>
					<S.FormWrapper>
						<S.FormContainer>
							<FormField
								type={'number'}
								value={amount}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
								disabled={loading || !arProvider.walletAddress}
								invalid={getInvalidForm()}
								endText={language.uTokens}
							/>
						</S.FormContainer>
					</S.FormWrapper>
					<S.Message>
						<p>{language.sellArtifactDescription}</p>
					</S.Message>
					<S.SubmitWrapper>
						<Button
							label={language.submit}
							type={'alt1'}
							handlePress={(e) => handleSell(e)}
							disabled={getDisabledSubmit()}
							loading={loading}
							formSubmit
						/>
					</S.SubmitWrapper>
				</S.Form>
			</S.ModalWrapper>
		</Modal>
	);
}
