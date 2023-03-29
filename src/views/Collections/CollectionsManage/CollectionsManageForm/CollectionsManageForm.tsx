import React from 'react';

import { ANSTopicEnum } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Select } from 'components/atoms/Select';
import { TextArea } from 'components/atoms/TextArea';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function CollectionsManageForm(props: IProps) {
	function getInvalidTitle() {
		return { status: false, message: null };
		// return { status: true, message: LANGUAGE.collectionNameAlreadyExists };
	}

	function getSubmitDisabled() {
		return (
			!props.title || getInvalidTitle().status || !props.topic || !props.description || props.selectedIds.length <= 0
		);
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
				handlePress={() => props.handleSave()}
				disabled={getSubmitDisabled()}
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
							value={props.title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value as any)}
							invalid={getInvalidTitle()}
							disabled={false}
							sm
						/>
						<Select
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTopic(e.target.value as any)}
							display={LANGUAGE.topic}
							value={props.topic}
							options={Object.keys(ANSTopicEnum).map((topic: string) => topic)}
							disabled={false}
						/>
						<TextArea
							label={LANGUAGE.description}
							value={props.description}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setDescription(e.target.value as any)}
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
