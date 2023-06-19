import React from 'react';

import { ValidationType } from 'arcframework';
import { OrderBook } from 'permaweb-orderbook';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: notification
// TODO: tooltip / copy
export default function ArtifactSell(props: IProps) {
	const arProvider = useArweaveProvider();

	const [amount, setAmount] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);

	async function handleSell(e: any) {
		e.preventDefault();
		setLoading(true);
		const orderbook = await OrderBook.init({
			currency: 'U',
			wallet: 'use_wallet',
		});

		const orderTx = await orderbook.sell({
			assetId: props.artifactId,
			price: amount * 1e6,
			qty: 1,
		});

		console.log(orderTx);
		setLoading(false);
	}

	function getInvalidForm(): ValidationType {
		return { status: false, message: null };
	}

	function getDisabledSubmit() {
		return getInvalidForm().status || loading || !arProvider.walletAddress || isNaN(amount) || amount <= 0;
	}

	return (
		<Modal header={language.sellArtifact} handleClose={props.handleClose}>
			<S.ModalWrapper>
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
