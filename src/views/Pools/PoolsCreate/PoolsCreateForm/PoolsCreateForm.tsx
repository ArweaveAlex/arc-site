import React from 'react';

import { ANSTopicEnum, formatAddress } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { MultiSelect } from 'components/atoms/MultiSelect';
import { TextArea } from 'components/atoms/TextArea';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: check existing pool title
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
		setShowImageUploadAction(false);
	}

	function getInvalidTitle() {
		return { status: true, message: language.poolAlreadyExists };
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
				type={'alt1'}
				label={language.create}
				handlePress={() => props.handleSave()}
				disabled={getSubmitDisabled()}
				height={52.5}
				width={350}
				loading={props.loading}
			/>
		);
	}

	return (
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
						<input ref={fileInputRef} id={'file-input'} type={'file'} accept={'image/*'} onChange={handleImageUpload} />
						{props.image && <img src={props.image} alt={'Preview'} />}
					</S.HeaderImage>
				</S.HeaderImageWrapper>
				<S.OwnerInfoWrapper>
					<S.Header>
						<p>{language.ownerInfo}</p>
					</S.Header>
					{arProvider && (
						<>
							<S.OwnerInfo>
								<S.DataLine>
									<span>{`${language.address}:`}</span>
									&nbsp;
									<p>{formatAddress(arProvider.walletAddress, true)}</p>
								</S.DataLine>
								{arProvider.arProfile && (
									<S.DataLine>
										<span>{`${language.handle}:`}</span>
										&nbsp;
										<p>{arProvider.arProfile.handle}</p>
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
						<S.Fields>
							<FormField
								label={language.title}
								value={props.title}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value as any)}
								invalid={getInvalidTitle()}
								disabled={props.loading}
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
								options={Object.keys(ANSTopicEnum).map((topic: string) => topic)}
								disabled={props.loading}
								invalid={{ status: false, message: null }}
							/>
							<TextArea
								label={language.description}
								value={props.description}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setDescription(e.target.value as any)}
								invalid={{ status: false, message: null }}
								disabled={props.loading}
							/>
						</S.Fields>
						<S.SubmitContainer>{getAction()}</S.SubmitContainer>
					</S.Form>
				</S.FormContent>
			</S.FormContainer>
		</S.Wrapper>
	);
}
