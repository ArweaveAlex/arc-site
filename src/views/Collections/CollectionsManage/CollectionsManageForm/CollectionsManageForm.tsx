import React from 'react';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { TextArea } from 'components/atoms/TextArea';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function CollectionsManageForm() {
	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');

	function getInvalidTitle() {
		return { status: false, message: null };
		// return { status: true, message: LANGUAGE.collectionNameAlreadyExists };
	}

	// function getSubmitDisabled() {
	// 	// return !title || getInvalidTitle().status || !topic || !description || selectedIds.length <= 0;
	// 	// return !title || getInvalidTitle().status || !topic || !description;
	// 	return true;
	// }

	function handleSave() {
		console.log('Save');
	}

	function getAction() {
		// let lang: string;
		// let func: () => void;
		// let disabled: boolean;

		// lang = LANGUAGE.save;
		// func = () => handleSave();
		// disabled = getSubmitDisabled();

		// if (contractId) {
		// 	lang = LANGUAGE.save;
		// 	func = () => handleSave();
		// 	disabled = getSubmitDisabled();
		// } else {
		// 	lang = LANGUAGE.create;
		// 	func = () => handleCreate();
		// 	disabled = getSubmitDisabled();
		// }

		return (
			<Button
				type={'alt1'}
				label={LANGUAGE.save}
				handlePress={() => handleSave()}
				disabled={false}
				height={52.5}
				width={350}
			/>
		);
	}

	return (
		<S.FormContainer>
			<S.Header>
				<p>{LANGUAGE.basicInformation}</p>
			</S.Header>
			<S.FormContent>
				<S.Form>
					<S.Fields>
						<FormField
							label={LANGUAGE.title}
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
							invalid={getInvalidTitle()}
							disabled={false}
							sm
						/>
						<FormField
							label={LANGUAGE.topic}
							value={topic}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
							invalid={{ status: false, message: null }}
							disabled={false}
							sm
						/>
						<TextArea
							label={LANGUAGE.description}
							value={description}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
							invalid={{ status: false, message: null }}
							disabled={false}
						/>
					</S.Fields>
					<S.SubmitContainer>{getAction()}</S.SubmitContainer>
				</S.Form>
			</S.FormContent>
		</S.FormContainer>
	);
}
