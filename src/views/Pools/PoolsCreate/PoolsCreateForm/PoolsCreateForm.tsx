// tooltip={language.headerImageInfo}

import React from 'react';

import * as ArcFramework from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { Checkbox } from 'components/atoms/Checkbox';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { MultiSelect } from 'components/atoms/MultiSelect';
import { Notification } from 'components/atoms/Notification';
import { TextArea } from 'components/atoms/TextArea';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function PoolsCreateForm(props: IProps) {
	const arProvider = useArweaveProvider();

	const fileInputRef = React.useRef<any>(null);

	const [showImageUploadAction, setShowImageUploadAction] = React.useState(true);

	function handleImageUpload(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			props.setImage(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
		const readerBuff = new FileReader();
		readerBuff.onload = () => {
			props.setImageBuffer(readerBuff.result);
		};
		if (file) {
			readerBuff.readAsArrayBuffer(file);
		}
		setShowImageUploadAction(false);
	}

	function getInvalidTitle() {
		let message: string | null;
		const invalid = props.title.length < 0 || props.invalidTitle;
		if (props.invalidTitle) {
			message = language.poolAlreadyExists;
		}
		return { status: invalid, message: message };
	}

	function getInvalidContributionPercentage() {
		const invalid = props.contributionPercentage < 0 || props.contributionPercentage > 100;
		return { status: invalid, message: invalid ? language.invalidContributionPercentage : null };
	}

	function getSubmitDisabled() {
		return props.loading || !props.title || getInvalidTitle().status || !props.topics || !props.description;
	}

	function getAction() {
		return (
			<Button
				type={'success'}
				label={language.create}
				handlePress={() => props.handleSave()}
				disabled={getSubmitDisabled()}
				loading={props.loading}
			/>
		);
	}

	return (
		<>
			{props.poolCreateError && (
				<Notification
					type={'warning'}
					message={language.errorOccurred}
					callback={() => props.setPoolCreateError(false)}
				/>
			)}
			{props.createdPool && props.poolCreateSuccess && (
				<Modal header={null} handleClose={() => props.setPoolCreateSuccess(false)} closeHidden={true}>
					<S.SuccessModal>
						<h2>{language.poolCreated}</h2>
						<S.ModalDataLine>
							<span>{`${language.title}:`}</span>
							&nbsp;
							<p>{props.title}</p>
						</S.ModalDataLine>
						<p>{language.poolCreatedInfo}</p>
						<ButtonLink
							type={'primary'}
							label={language.managePool}
							href={urls.poolManageMine(props.createdPool.contracts.pool.id)}
							height={52.5}
							width={275}
						/>
					</S.SuccessModal>
				</Modal>
			)}
			<S.Wrapper>
				<S.C1>
					<S.HeaderImageWrapper>
						<S.Header>
							<p>{language.headerImage}</p>
							<Button
								type={'alt1'}
								label={language.uploadImage}
								handlePress={() => fileInputRef.current.click()}
								disabled={props.loading}
							/>
						</S.Header>
						<S.HeaderImage disabled={props.loading}>
							{showImageUploadAction && <label htmlFor={'file-input'}>{language.uploadImage}</label>}
							<input
								ref={fileInputRef}
								id={'file-input'}
								type={'file'}
								accept={'image/*'}
								onChange={handleImageUpload}
							/>
							{props.image && <img src={props.image} alt={'Preview'} />}
						</S.HeaderImage>
					</S.HeaderImageWrapper>
					<S.OwnerInfoWrapper>
						<S.Header>
							<p>{language.ownerInfo}</p>
						</S.Header>
						{arProvider && (
							<>
								<S.OwnerInfo className={'border-wrapper'}>
									<S.DataLine>
										<span>{`${language.address}:`}</span>
										&nbsp;
										<p>{ArcFramework.formatAddress(arProvider.walletAddress, true)}</p>
									</S.DataLine>
									{arProvider.profile && (
										<S.DataLine>
											<span>{`${language.handle}:`}</span>
											&nbsp;
											<p>{arProvider.profile.handle}</p>
										</S.DataLine>
									)}
								</S.OwnerInfo>
							</>
						)}
					</S.OwnerInfoWrapper>
				</S.C1>
				<S.FormContainer>
					<S.Header>
						<p>{language.basicInformation}</p>
					</S.Header>
					<S.FormContent>
						<S.Form>
							<S.Fields className={'border-wrapper'}>
								<FormField
									label={language.title}
									value={props.title}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value as any)}
									invalid={getInvalidTitle()}
									disabled={props.loading}
									required
									sm
								/>
								<FormField
									type={'number'}
									label={language.contributionPercentage}
									value={props.contributionPercentage}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										props.setContributionPercentage(parseFloat(e.target.value))
									}
									invalid={getInvalidContributionPercentage()}
									disabled={props.loading}
									sm
									tooltip={language.contributionPercentageTooltip}
								/>
								<MultiSelect
									onChange={(options: string[]) => props.setTopics(options)}
									label={language.topics}
									display={language.chooseTopics}
									values={props.topics}
									options={Object.keys(ArcFramework.ANSTopicEnum).map((topic: string) => topic)}
									disabled={props.loading}
									invalid={{ status: false, message: null }}
								/>
								<S.KeywordsWrapper>
									<S.KeywordsHeader>
										<p>{language.keywords}</p>
										<IconButton
											type={'alt1'}
											src={ASSETS.add}
											handlePress={() => props.addKeyword()}
											dimensions={{
												icon: 10,
												wrapper: 20,
											}}
										/>
									</S.KeywordsHeader>
									{props.keywords.map((keyword: string, index: number) => {
										return (
											<S.FlexField key={index}>
												<FormField
													label={`(${index + 1})`}
													value={keyword}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														props.setKeywords(e.target.value as any, index)
													}
													invalid={{ status: false, message: null }}
													disabled={props.loading}
													sm
													tooltip={index < 1 ? language.keywordTooltip : null}
													tooltipLabel={language.keywords}
												/>
												<IconButton
													type={'alt1'}
													src={ASSETS.remove}
													handlePress={() => props.removeKeyword(index)}
													dimensions={{
														icon: 10,
														wrapper: 20,
													}}
												/>
											</S.FlexField>
										);
									})}
								</S.KeywordsWrapper>
								<TextArea
									label={language.description}
									value={props.description}
									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setDescription(e.target.value as any)}
									invalid={{ status: false, message: null }}
									disabled={props.loading}
									required
								/>
								<S.TCheckbox>
									<span>{language.poolTradeableOption}</span>
									<Checkbox checked={props.tradeable} disabled={false} handleSelect={props.setTradeable} />
								</S.TCheckbox>
							</S.Fields>
							<S.SubmitContainer>{getAction()}</S.SubmitContainer>
						</S.Form>
					</S.FormContent>
				</S.FormContainer>
			</S.Wrapper>
		</>
	);
}
