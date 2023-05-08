import parse from 'html-react-parser';

import { ButtonLink } from 'components/atoms/ButtonLink';
import { language } from 'helpers/language';

import * as S from './styles';

export default function CreateDetail() {
	return (
		<S.Wrapper>
			<div className={'view-wrapper max-cutoff'}>
				<S.HeaderWrapper>
					<h2 className={'h2-alt-2'}>{language.createView.stepsHeader1}</h2>
				</S.HeaderWrapper>
				{language.createView.steps.list.map((step: any, index: number) => (
					<S.Section key={index}>
						<S.StepWrapper>
							<S.StepHeader>
								<span>{`${language.createView.steps.display} ${index + 1}:`}</span>
								<p>{step.header}</p>
							</S.StepHeader>
							<S.StepDescription>{parse(step.description)}</S.StepDescription>
							{step.action && (
								<S.Action>
									<ButtonLink
										type={'primary'}
										label={step.action.label}
										href={step.action.href}
										height={52.5}
										width={275}
									/>
								</S.Action>
							)}
						</S.StepWrapper>
					</S.Section>
				))}
			</div>
		</S.Wrapper>
	);
}
