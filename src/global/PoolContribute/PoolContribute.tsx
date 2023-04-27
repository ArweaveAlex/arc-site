import React from 'react';

import { ContributionResultType, formatAddress, PoolClient, ValidationType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function PoolContribute(props: IProps) {
	const arProvider = useArweaveProvider();
	const poolClient = new PoolClient();

	const [amount, setAmount] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [receivingPercent, setReceivingPercent] = React.useState<string | null>(null);

	const [contributionResult, setContributionResult] = React.useState<ContributionResultType | null>(null);

	const [copied, setCopied] = React.useState<boolean>(false);

	const copyAddress = React.useCallback(async () => {
		if (props.poolId) {
			if (props.poolId.length > 0) {
				await navigator.clipboard.writeText(props.poolId);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.poolId]);

	async function handlePoolContribute(e: any) {
		if (arProvider.availableBalance) {
			e.preventDefault();
			setLoading(true);
			setContributionResult(await poolClient.handlePoolContribute(props.poolId, amount, arProvider.availableBalance));
			setLoading(false);
		}
	}

	function getAvailableBalance() {
		if (!arProvider.walletAddress) {
			return <p>{LANGUAGE.walletNotConnected}</p>;
		} else {
			if (arProvider.availableBalance) {
				return (
					<>
						<S.AvailableBalance>{LANGUAGE.availableBalance}:&nbsp;</S.AvailableBalance>
						<S.BalanceAmount>{arProvider.availableBalance.toFixed(3)}&nbsp;</S.BalanceAmount>
						<S.ARTokens>{LANGUAGE.arTokens}</S.ARTokens>
					</>
				);
			} else {
				if (arProvider.availableBalance === 0) {
					return (
						<>
							<S.AvailableBalance>{LANGUAGE.availableBalance}:&nbsp;</S.AvailableBalance>
							<S.BalanceAmount>{0}&nbsp;</S.BalanceAmount>
							<S.ARTokens>{LANGUAGE.arTokens}</S.ARTokens>
						</>
					);
				}
				return <p>{LANGUAGE.fetchingBalance}&nbsp;...</p>;
			}
		}
	}

	function getInvalidForm(): ValidationType {
		if (!arProvider.availableBalance) {
			return { status: false, message: null };
		} else {
			if (amount > arProvider.availableBalance) {
				return { status: true, message: LANGUAGE.amountExceedsBalance };
			}
			return { status: false, message: null };
		}
	}

	function getReceivingPercent() {
		if (receivingPercent) {
			return (
				<S.RPWrapper>
					<span>{LANGUAGE.willBeReceiving}:</span>
					<p>
						~&nbsp;{receivingPercent}% {LANGUAGE.ofArtifactsCreated}.
					</p>
				</S.RPWrapper>
			);
		} else {
			return <p>{LANGUAGE.fetchingReceivingPercentage}&nbsp;...</p>;
		}
	}

	function getDisabledSubmit() {
		return getInvalidForm().status || loading || !arProvider.walletAddress || isNaN(amount) || amount <= 0;
	}

	function getSubheader() {
		return (
			<S.SubheaderFlex>
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{LANGUAGE.pool.subheader1}</p>
					</S.Subheader1>
					&nbsp;
					<S.ID>
						<p>{props.poolId ? formatAddress(props.poolId, false) : null}</p>
						<IconButton type={'primary'} src={ASSETS.copy} handlePress={copyAddress} sm />
						{copied && (
							<S.IDCopied>
								<p>{LANGUAGE.copied}</p>
							</S.IDCopied>
						)}
					</S.ID>
				</S.SubheaderContainer>
				&nbsp; &nbsp;
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{LANGUAGE.createdOn}</p>
					</S.Subheader1>
					&nbsp;
					<S.Subheader2>
						<p>{props.dateCreated ? props.dateCreated : null}</p>
					</S.Subheader2>
				</S.SubheaderContainer>
			</S.SubheaderFlex>
		);
	}

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				setReceivingPercent(
					poolClient.getReceivingPercent(arProvider.walletAddress, props.contributors, props.totalContributions, amount)
				);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arProvider, arProvider.walletAddress, props.poolId, props.contributors, props.totalContributions, amount]);

	return (
		<>
			{contributionResult && (
				<Notification
					type={contributionResult.status === true ? 'success' : 'warning'}
					message={contributionResult.message!}
					callback={() => setContributionResult(null)}
				/>
			)}

			<Modal header={LANGUAGE.contributeTo} handleClose={() => props.handleShowModal()}>
				<S.ModalWrapper>
					<S.Header>
						<S.HeaderFlex>
							<S.Header1>{props.header}</S.Header1>
						</S.HeaderFlex>
						{getSubheader()}
						<S.BalanceWrapper>{getAvailableBalance()}</S.BalanceWrapper>
						{props.contribPercent && (
							<S.Warning>
								<p>{LANGUAGE.contributionPercentage(props.contribPercent)}</p>
							</S.Warning>
						)}
					</S.Header>
					<S.Form onSubmit={(e) => handlePoolContribute(e)}>
						<S.FormWrapper>
							<S.FormContainer>
								<FormField
									type={'number'}
									value={amount}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
									disabled={loading || !arProvider.walletAddress}
									invalid={getInvalidForm()}
									endText={LANGUAGE.arTokens}
								/>
							</S.FormContainer>
							{arProvider.walletAddress && <S.RPWrapper>{getReceivingPercent()}</S.RPWrapper>}
						</S.FormWrapper>
						<S.Message>
							<p>{LANGUAGE.contributionMessage}</p>
						</S.Message>
						<S.SubmitWrapper>
							<Button
								label={LANGUAGE.submit}
								type={'alt1'}
								handlePress={(e) => handlePoolContribute(e)}
								disabled={getDisabledSubmit()}
								loading={loading}
								formSubmit
							/>
						</S.SubmitWrapper>
					</S.Form>
				</S.ModalWrapper>
			</Modal>
		</>
	);
}
