import React from 'react';

import { ANSTopicEnum } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Select } from 'components/atoms/Select';
import { TextArea } from 'components/atoms/TextArea';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function CollectionsManageForm(props: IProps) {
	function getInvalidTitle() {
		return { status: false, message: null };
	}

	function getSubmitDisabled() {
		return (
			!props.title || getInvalidTitle().status || !props.topic || !props.description || props.selectedIds.length <= 0
		);
	}

	function getAction() {
		return (
			<Button
				type={'success'}
				label={language.create}
				handlePress={() => props.handleSave()}
				disabled={getSubmitDisabled()}
			/>
		);
	}

	return (
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
							disabled={false}
							sm
						/>
						<Select
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTopic(e.target.value as any)}
							display={language.topic}
							value={props.topic}
							options={Object.keys(ANSTopicEnum).map((topic: string) => topic)}
							disabled={false}
						/>
						<S.Description>
							<TextArea
								label={language.description}
								value={props.description}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setDescription(e.target.value as any)}
								invalid={{ status: false, message: null }}
								disabled={false}
							/>
						</S.Description>
					</S.Fields>
					<S.SubmitContainer>{getAction()}</S.SubmitContainer>
				</S.Form>
			</S.FormContent>
		</S.FormContainer>
	);
}
