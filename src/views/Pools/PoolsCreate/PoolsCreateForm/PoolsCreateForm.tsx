import { ANSTopicEnum } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { MultiSelect } from 'components/atoms/MultiSelect';
import { TextArea } from 'components/atoms/TextArea';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function PoolsCreateForm(props: IProps) {
	function getInvalidTitle() {
		return { status: false, message: null };
	}

	function getSubmitDisabled() {
		return !props.title || getInvalidTitle().status || !props.topics || !props.description;
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
			/>
		);
	}

	return (
		<S.Wrapper>
			<S.FormContainer>
				<S.Header>
					<p>{language.basicInformation}</p>
				</S.Header>
				<S.FormContent>
					<S.Form>
						<S.Fields>
							<S.FlexFields>
								<S.FlexField>
									<FormField
										label={language.title}
										value={props.title}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value as any)}
										invalid={getInvalidTitle()}
										disabled={false}
										sm
									/>
								</S.FlexField>
								<S.FlexField>
									<MultiSelect
										onChange={(options: string[]) => props.setTopics(options)}
										label={language.topics}
										display={language.chooseTopics}
										values={props.topics}
										options={Object.keys(ANSTopicEnum).map((topic: string) => topic)}
										disabled={false}
										invalid={{ status: false, message: null }}
									/>
								</S.FlexField>
							</S.FlexFields>
							<TextArea
								label={language.description}
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
		</S.Wrapper>
	);
}
