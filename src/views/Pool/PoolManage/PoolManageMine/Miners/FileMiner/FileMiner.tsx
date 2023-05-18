import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ActionDropdown } from 'components/atoms/ActionDropdown';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { Table } from 'components/organisms/Table';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { AlignType, FileMetadataType } from 'helpers/types';

import * as S from './styles';

function FileMinerDropdown(props: {
	data: FileMetadataType;
	handleAddMetadata: (fileName: string, metadata: { [key: string]: string }) => void;
	handleRemoveFile: (fileName: string) => void;
}) {
	const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
	const [metadataModalOpen, setMetadataModalOpen] = React.useState<boolean>(false);

	const [metadataFields, setMetadataFields] = React.useState<Array<{ field: string; value: string }>>([
		{ field: '', value: '' },
	]);

	function handleAddMetadata() {
		const metadata = metadataFields.reduce((acc, field) => {
			return { ...acc, [field.field]: field.value };
		}, {});

		props.handleAddMetadata(props.data.file.name, metadata);
		setMetadataModalOpen(false);
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

	return (
		<>
			{metadataModalOpen && (
				<Modal header={language.updateMetadata} handleClose={() => setMetadataModalOpen(false)}>
					<S.MWrapper>
						<S.MHeaderWrapper>
							<S.MHeader>
								<span>{language.fileName}</span>
								&nbsp;
								<p>{props.data.file.name}</p>
							</S.MHeader>
							<Button type={'alt2'} label={language.addField} handlePress={() => handleAddMetadataField()} />
						</S.MHeaderWrapper>
						<S.MBodyWrapper>
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
						</S.MBodyWrapper>
						<S.MFooterWrapper>
							<Button
								type={'alt1'}
								label={language.save}
								handlePress={() => handleAddMetadata()}
								height={52.5}
								width={275}
								disabled={getDisabled()}
							/>
						</S.MFooterWrapper>
					</S.MWrapper>
				</Modal>
			)}
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

// TODO: disable action dropdown - loading
export default function FileMiner() {
	const fileInputRef = React.useRef<any>(null);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [selectedData, setSelectedData] = React.useState<FileMetadataType[]>([]);
	const [metadataUpdated, setMetadataUpdated] = React.useState<boolean>(false);

	function handleFileChange(e: any) {
		let newFiles = [...e.target.files].map((file: any) => {
			return { file: file, metadata: {} };
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
				fileData.file.name === fileName ? { ...fileData, metadata: { ...fileData.metadata, ...newMetadata } } : fileData
			)
		);
		setMetadataUpdated(true);
	}

	const handleUpload = async () => {
		setLoading(true);
		console.log(selectedData);
		setLoading(false);
	};

	function getHeader() {
		return {
			fileName: {
				width: '90%',
				align: 'left' as AlignType,
				display: language.fileName,
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
				handleRemoveFile={(fileName: string) => handleRemoveFile(fileName)}
			/>
		);
	}

	function getData() {
		return selectedData.map((data: FileMetadataType) => {
			return {
				data: {
					fileName: data.file.name,
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
					recordsPerPage={10}
					showPageNumbers={false}
					handleCursorFetch={() => {}}
					cursors={{
						next: null,
						previous: null,
					}}
					showNoResults={false}
				/>
			);
		} else {
			return (
				<S.EWrapper>
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
							disabled={loading}
						/>
					</S.EAction>
				</S.EWrapper>
			);
		}
	}

	return (
		<>
			{metadataUpdated && (
				<Notification type={'success'} message={language.metadataUpdated} callback={() => setMetadataUpdated(false)} />
			)}
			<S.Wrapper>
				<S.Header>
					<S.DataWrapper>
						<S.DataTitle>
							<p>{`${language.filesSelected}:`}</p>
						</S.DataTitle>
						&nbsp;
						<S.Data>
							<p>{selectedData.length}</p>
						</S.Data>
					</S.DataWrapper>
					<S.Actions>
						<Button
							type={'alt1'}
							label={language.chooseFiles}
							handlePress={() => fileInputRef.current.click()}
							disabled={loading}
						/>
						<Button
							type={'success'}
							label={language.upload}
							handlePress={handleUpload}
							disabled={selectedData.length <= 0 || loading}
						/>
					</S.Actions>
				</S.Header>
				{getTable()}
				<input ref={fileInputRef} type={'file'} multiple onChange={handleFileChange} />
			</S.Wrapper>
		</>
	);
}
