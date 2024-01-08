import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ArweaveWebIrys } from '@irys/sdk/build/esm/web/tokens/arweave';

import { PoolClient, PoolConfigClient, SequenceType } from 'arcframework';

import { ActionDropdown } from 'components/atoms/ActionDropdown';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { Table } from 'components/molecules/Table';
import { ASSETS, POOL_TEST_MODE, UPLOAD_CONFIG } from 'helpers/config';
import { language } from 'helpers/language';
import { AlignType, FileMetadataType, UploadingStatusType } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { IProps } from '../types';

import { uploadFile } from './miner';
import * as S from './styles';

function FileMinerDropdown(props: {
	data: FileMetadataType;
	handleAddMetadata: (fileName: string, metadata: { [key: string]: string }) => void;
	handleAddTitle: (fileName: string, title: string) => void;
	handleAddGroup: (fileName: string, activeGroup: string) => void;
	handleRemoveFile: (fileName: string) => void;
	availableGroups: string[];
	setAvailableGroups: (groupOption: string) => void;
}) {
	const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
	const [metadataModalOpen, setMetadataModalOpen] = React.useState<boolean>(false);
	const [titleModalOpen, setTitleModalOpen] = React.useState<boolean>(false);
	const [groupModalOpen, setGroupModalOpen] = React.useState<boolean>(false);
	const [groupOptionModalOpen, setGroupOptionModalOpen] = React.useState<boolean>(false);
	const [groupOption, setGroupOption] = React.useState<string>('');

	const [metadataFields, setMetadataFields] = React.useState<Array<{ field: string; value: string }>>([
		{ field: '', value: '' },
	]);

	const [title, setTitle] = React.useState<string>('');
	const [activeGroup, setActiveGroup] = React.useState<string>('');

	function handleAddMetadata() {
		const metadata = metadataFields.reduce((acc, field) => {
			return { ...acc, [field.field]: field.value };
		}, {});

		props.handleAddMetadata(props.data.file.name, metadata);
		setMetadataModalOpen(false);
	}

	function handleAddTitle() {
		props.handleAddTitle(props.data.file.name, title);
		setTitleModalOpen(false);
	}

	function handleAddGroup() {
		props.handleAddGroup(props.data.file.name, activeGroup);
		setGroupModalOpen(false);
	}

	function handleAddGroupOption() {
		props.setAvailableGroups(groupOption);
		setActiveGroup(groupOption);
		setGroupOptionModalOpen(false);
		setGroupOption('');
	}

	function handleAddMetadataField() {
		setMetadataFields((prevMetadataFields) => [...prevMetadataFields, { field: '', value: '' }]);
	}

	function handleRemoveFile() {
		props.handleRemoveFile(props.data.file.name);
	}

	function handleChangeMetadataField(index: number, field: string, value: string) {
		setMetadataFields((prevMetadataFields) =>
			prevMetadataFields.map((metadataField, i) => (i === index ? { ...metadataField, [field]: value } : metadataField))
		);
	}

	function handleRemoveMetadataField(index: number) {
		setMetadataFields((prevMetadataFields) => prevMetadataFields.filter((_, i) => i !== index));
	}

	function getActions() {
		return [
			{
				fn: () => setTitleModalOpen(true),
				closeOnAction: true,
				subComponent: null,
				label: language.addArtifactName,
				disabled: false,
				loading: false,
			},
			{
				fn: () => setGroupModalOpen(true),
				closeOnAction: true,
				subComponent: null,
				label: language.addToGroup,
				disabled: false,
				loading: false,
			},
			{
				fn: () => setMetadataModalOpen(true),
				closeOnAction: true,
				subComponent: null,
				label: language.updateMetadata,
				disabled: false,
				loading: false,
			},
			{
				fn: handleRemoveFile,
				closeOnAction: true,
				subComponent: null,
				label: language.removeFile,
				disabled: false,
				loading: false,
			},
		];
	}

	function getDisabled() {
		if (metadataModalOpen) {
			for (const element of metadataFields) {
				if (!element.field || !element.value) {
					return true;
				}
			}
			const uniqueValues = new Set();
			let hasDuplicate = false;

			for (const element of metadataFields) {
				if (uniqueValues.has(element.field)) {
					hasDuplicate = true;
					break;
				}
				uniqueValues.add(element.field);
			}
			return hasDuplicate;
		}
		if (titleModalOpen) {
			return !title;
		}
		if (groupModalOpen) {
			return !activeGroup;
		}
	}

	function getModal() {
		let header: string;
		let handleClose: () => void;
		let body: React.ReactNode;
		let handleSave: () => void;

		if (metadataModalOpen) {
			header = language.updateMetadata;
			handleClose = () => setMetadataModalOpen(false);
			body = (
				<>
					{metadataFields.map((metadataField: any, index: number) => (
						<S.FieldsWrapper key={index}>
							<S.FieldsHeader>
								<p>{`${language.metadataField} (${index + 1})`}</p>
								<IconButton
									type={'primary'}
									sm
									warning
									src={ASSETS.close}
									handlePress={() => handleRemoveMetadataField(index)}
									tooltip={language.removeField}
								/>
							</S.FieldsHeader>
							<FormField
								label={language.field}
								value={metadataField.field}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleChangeMetadataField(index, 'field', e.target.value)
								}
								invalid={{
									status: false,
									message: null,
								}}
								disabled={false}
								sm
							/>
							<FormField
								label={language.value}
								value={metadataField.value}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleChangeMetadataField(index, 'value', e.target.value)
								}
								invalid={{ status: false, message: null }}
								disabled={false}
								sm
							/>
						</S.FieldsWrapper>
					))}
				</>
			);
			handleSave = handleAddMetadata;
		}
		if (titleModalOpen) {
			header = language.addArtifactName;
			handleClose = () => setTitleModalOpen(false);
			body = (
				<FormField
					label={language.artifactName}
					value={title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
					invalid={{
						status: false,
						message: null,
					}}
					disabled={false}
					sm
				/>
			);
			handleSave = handleAddTitle;
		}
		if (groupModalOpen) {
			header = language.addToGroup;
			handleClose = () => setGroupModalOpen(false);
			body = (
				<>
					<S.GFlexWrapper>
						{props.availableGroups.length ? (
							props.availableGroups.map((group: string, index: number) => {
								return (
									<Button
										key={index}
										type={'alt2'}
										label={group}
										handlePress={() => setActiveGroup(group === activeGroup ? '' : group)}
										active={group === activeGroup}
										height={45}
									/>
								);
							})
						) : (
							<Button
								type={'alt2'}
								label={language.addGroupOption}
								handlePress={() => setGroupOptionModalOpen(true)}
								active={false}
								height={45}
							/>
						)}
					</S.GFlexWrapper>
				</>
			);
			handleSave = handleAddGroup;
		}

		return (
			<>
				<Modal header={header} handleClose={handleClose}>
					<S.MWrapper>
						<S.MHeaderWrapper>
							<S.MHeader>
								<span>{language.fileName}</span>
								&nbsp;
								<p>{props.data.file.name}</p>
							</S.MHeader>
							{metadataModalOpen && (
								<Button type={'alt2'} label={language.addField} handlePress={() => handleAddMetadataField()} />
							)}
							{groupModalOpen && (
								<Button
									type={'alt2'}
									label={language.addGroupOption}
									handlePress={() => setGroupOptionModalOpen(true)}
								/>
							)}
						</S.MHeaderWrapper>
						<S.MBodyWrapper>{body}</S.MBodyWrapper>
						<S.MFooterWrapper>
							<Button type={'alt1'} label={language.save} handlePress={handleSave} disabled={getDisabled()} />
						</S.MFooterWrapper>
					</S.MWrapper>
				</Modal>
				{groupOptionModalOpen && (
					<Modal header={language.addGroupOption} handleClose={() => setGroupOptionModalOpen(false)}>
						<S.GAddWrapper>
							<FormField
								label={language.groupName}
								value={groupOption}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupOption(e.target.value)}
								invalid={{
									status: props.availableGroups.includes(groupOption),
									message: props.availableGroups.includes(groupOption) ? language.groupExists : null,
								}}
								disabled={false}
								sm
							/>
							<Button
								type={'alt1'}
								label={language.add}
								handlePress={handleAddGroupOption}
								disabled={!groupOption || props.availableGroups.includes(groupOption)}
							/>
						</S.GAddWrapper>
					</Modal>
				)}
			</>
		);
	}

	return (
		<>
			{(metadataModalOpen || titleModalOpen || groupModalOpen) && getModal()}
			<ActionDropdown
				open={dropdownOpen}
				handleCallback={() => setDropdownOpen(!dropdownOpen)}
				handleShowDropdown={() => setDropdownOpen(!dropdownOpen)}
				actions={getActions()}
				closeDisabled={false}
			/>
		</>
	);
}

const SEQUENCE_ITERATION = 10;

export default function FileMiner(props: IProps) {
	const { id } = useParams();

	const arProvider = useArweaveProvider();

	const fileInputRef = React.useRef<any>(null);

	const [uploadingStatus, setUploadingStatus] = React.useState<UploadingStatusType | null>(null);
	const [selectedData, setSelectedData] = React.useState<FileMetadataType[]>([]);
	const [currentSelectedData, setCurrentSelectedData] = React.useState<FileMetadataType[]>([]);
	const [metadataUpdated, setMetadataUpdated] = React.useState<boolean>(false);
	const [availableGroups, setAvailableGroups] = React.useState<string[]>([]);

	const [uploadIndex, setUploadIndex] = React.useState<number>(0);
	const [uploadPercentage, setUploadPercentage] = React.useState<number>(0);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const [cursor, setCursor] = React.useState<string | null>(null);

	const [sequence, setSequence] = React.useState<SequenceType>({
		start: SEQUENCE_ITERATION - (SEQUENCE_ITERATION - 1) - 1,
		end: SEQUENCE_ITERATION - 1,
	});

	React.useEffect(() => {
		const handleBeforeUnload = (e: any) => {
			e.preventDefault();
			e.returnValue = '';
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	React.useEffect(() => {
		if (cursor) {
			setSequence({
				start: cursor === 'next' ? sequence.start + SEQUENCE_ITERATION : sequence.start - SEQUENCE_ITERATION,
				end: cursor === 'next' ? sequence.end + SEQUENCE_ITERATION : sequence.end - SEQUENCE_ITERATION,
			});
		}
	}, [cursor]);

	React.useEffect(() => {
		if (selectedData) {
			let currentData = [...selectedData].splice(sequence.start, sequence.end + 1);
			setCurrentSelectedData(currentData);
		}
	}, [selectedData, sequence]);

	async function handleUpload() {
		try {
			const poolConfigClient = new PoolConfigClient({ testMode: POOL_TEST_MODE });
			const poolConfig = await poolConfigClient.initFromContract({ poolId: id });
			const poolClient = new PoolClient({ poolConfig });

			setUploadingStatus('uploading');
			let index = 0;
			for (const data of selectedData) {
				const irys = new ArweaveWebIrys({ url: UPLOAD_CONFIG.node2, wallet: { provider: arProvider.wallet } });
				await irys.ready();

				let uploader = irys.uploader.chunkedUploader;
				uploader.setBatchSize(UPLOAD_CONFIG.batchSize);
				uploader.setChunkSize(UPLOAD_CONFIG.chunkSize);

				setUploadIndex(index + 1);
				uploader.on('chunkUpload', (chunkInfo) => {
					setUploadPercentage(Math.floor((chunkInfo.totalUploaded / data.file.size) * 100));
				});
				uploader.on('chunkError', (e) => {
					console.error(e);
				});
				await uploadFile(poolClient, data, uploader, arProvider.wallet);
				setUploadPercentage(0);
				index++;
			}
			setUploadingStatus('complete');
		} catch (e: any) {
			setErrorMessage(e.message ? e.message : language.errorOccurred);
			setUploadingStatus('error');
		}
	}

	function handleFileChange(e: any) {
		let newFiles = [...e.target.files].map((file: any) => {
			return { file: file, metadata: {}, title: '', associationId: '' };
		});

		newFiles = newFiles.filter(
			(newFile) => !selectedData.some((existingFile) => existingFile.file.name === newFile.file.name)
		);

		setSelectedData((prevSelectedData) => [...prevSelectedData, ...newFiles]);
	}

	function handleRemoveFile(fileName: string) {
		setSelectedData((prevSelectedData) => prevSelectedData.filter((fileData) => fileData.file.name !== fileName));
	}

	function handleAddMetadata(fileName: string, newMetadata: { [key: string]: string }) {
		setSelectedData((prevSelectedData) =>
			prevSelectedData.map((fileData) =>
				fileData.file.name === fileName
					? {
							file: fileData.file,
							metadata: { ...fileData.metadata, ...newMetadata },
							title: fileData.title,
							associationId: fileData.associationId,
					  }
					: fileData
			)
		);
		setMetadataUpdated(true);
	}

	function handleAddTitle(fileName: string, title: string) {
		setSelectedData((prevSelectedData) =>
			prevSelectedData.map((fileData) =>
				fileData.file.name === fileName
					? { file: fileData.file, metadata: fileData.metadata, title: title, associationId: fileData.associationId }
					: fileData
			)
		);
		setMetadataUpdated(true);
	}

	function handleAddGroup(fileName: string, group: string) {
		setSelectedData((prevSelectedData) =>
			prevSelectedData.map((fileData) =>
				fileData.file.name === fileName
					? { file: fileData.file, metadata: fileData.metadata, title: fileData.title, associationId: group }
					: fileData
			)
		);
		setMetadataUpdated(true);
	}

	function getHeader() {
		return {
			fileName: {
				width: '90%',
				align: 'left' as AlignType,
				display: language.artifactName,
			},
			actions: {
				width: '10%',
				align: 'center' as AlignType,
				display: language.actions,
			},
		};
	}

	function getActionDropdown(data: FileMetadataType) {
		return (
			<FileMinerDropdown
				data={data}
				handleAddMetadata={(fileName: string, metadata: { [key: string]: string }) =>
					handleAddMetadata(fileName, metadata)
				}
				handleAddTitle={(fileName: string, title: string) => handleAddTitle(fileName, title)}
				handleAddGroup={(fileName: string, group: string) => handleAddGroup(fileName, group)}
				handleRemoveFile={(fileName: string) => handleRemoveFile(fileName)}
				availableGroups={availableGroups}
				setAvailableGroups={(groupOption: string) => setAvailableGroups([...availableGroups, groupOption])}
			/>
		);
	}

	function getData() {
		return currentSelectedData.map((data: FileMetadataType) => {
			return {
				data: {
					fileName: data.title ? data.title : data.file.name,
					actions: getActionDropdown(data),
				},
				active: false,
				viewed: false,
			};
		});
	}

	function getTable() {
		if (selectedData.length > 0) {
			return (
				<Table
					title={language.filesSelected}
					action={null}
					header={getHeader()}
					data={getData()}
					recordsPerPage={SEQUENCE_ITERATION}
					showPageNumbers={false}
					handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
					cursors={{
						next: currentSelectedData.length < SEQUENCE_ITERATION ? null : 'next',
						previous: sequence.start <= 0 ? null : 'prev',
					}}
					showNoResults={false}
				/>
			);
		} else {
			return (
				<S.EWrapper className={'border-wrapper-alt'}>
					<S.ELogo>
						<ReactSVG src={ASSETS.file} />
					</S.ELogo>
					<S.ETitle>
						<S.H2>{language.filesAndMetadata}</S.H2>
					</S.ETitle>
					<S.EInfo>{parse(language.selectChooseFiles)}</S.EInfo>
					<S.EAction>
						<Button
							type={'alt2'}
							label={language.chooseFiles}
							handlePress={() => fileInputRef.current.click()}
							disabled={uploadingStatus !== null || props.disabled}
							noMinWidth
						/>
					</S.EAction>
				</S.EWrapper>
			);
		}
	}

	function getFileUploadStatus() {
		if (uploadingStatus === 'uploading' || uploadingStatus === 'complete') {
			return (
				<>
					<h2>{uploadingStatus === 'uploading' ? language.filesUploading : language.fileUploadComplete}</h2>
					<S.Message>
						<p>
							{uploadingStatus === 'uploading'
								? language.filesUploadingMessage
								: language.filesUploadingMessageComplete}
						</p>
					</S.Message>
					{uploadingStatus === 'uploading' && (
						<S.Message>
							<p>{`${language.uploadingFile}: ${uploadIndex} ${language.of} ${selectedData.length}`}</p>
						</S.Message>
					)}
					<S.ModalBottomContainer>
						{uploadingStatus === 'uploading' ? (
							<S.ModalLoadingContainer>
								<S.AContainer>
									<S.AProgress percentage={uploadPercentage.toString()}>
										<div />
										<span>{`${language.uploadStatus}: `}</span>
										&nbsp;
										<S.APercentage>{`${uploadPercentage.toString()}%`}</S.APercentage>
									</S.AProgress>
								</S.AContainer>
							</S.ModalLoadingContainer>
						) : (
							<S.MAction>
								<Button
									type={'alt1'}
									label={language.close}
									handlePress={() => {
										setUploadingStatus(null), setSelectedData([]);
									}}
								/>
							</S.MAction>
						)}
					</S.ModalBottomContainer>
				</>
			);
		} else {
			return null;
		}
	}

	return (
		<>
			{metadataUpdated && (
				<Notification type={'success'} message={language.metadataUpdated} callback={() => setMetadataUpdated(false)} />
			)}
			{uploadingStatus && uploadingStatus !== 'error' && (
				<Modal header={null} handleClose={() => setUploadingStatus(null)} closeHidden>
					<S.UploadingModalContainer>{getFileUploadStatus()}</S.UploadingModalContainer>
				</Modal>
			)}
			<S.Wrapper>
				<S.Header>
					<S.DataWrapper>
						<S.DataTitle>
							<p>{`${language.filesSelected}:`}</p>
						</S.DataTitle>
						&nbsp;
						<S.Data>
							<p>{`(${selectedData.length})`}</p>
						</S.Data>
					</S.DataWrapper>
					<S.Actions>
						<Button
							type={'alt1'}
							label={language.chooseFiles}
							handlePress={() => fileInputRef.current.click()}
							disabled={uploadingStatus !== null || props.disabled}
							noMinWidth
						/>
						<Button
							type={'success'}
							label={language.upload}
							handlePress={handleUpload}
							disabled={selectedData.length <= 0 || uploadingStatus !== null || props.disabled}
							noMinWidth
						/>
					</S.Actions>
				</S.Header>
				{getTable()}
				{errorMessage && uploadingStatus === 'error' && (
					<Notification
						message={errorMessage}
						type={'warning'}
						callback={() => {
							setUploadingStatus(null);
							setErrorMessage(null);
							setUploadPercentage(0);
						}}
					/>
				)}
				<input ref={fileInputRef} type={'file'} multiple onChange={handleFileChange} disabled={props.disabled} />
			</S.Wrapper>
		</>
	);
}
