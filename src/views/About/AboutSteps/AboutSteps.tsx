import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ButtonLink } from 'components/atoms/ButtonLink';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function AboutSteps() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<S.HeaderWrapper>
						<h2 className={'h2-alt-2'}>{LANGUAGE.aboutView.stepsHeader1}</h2>
					</S.HeaderWrapper>
					{LANGUAGE.aboutView.steps.list.map((step: any, index: number) => (
						<S.Section key={index} even={index % 2 === 0}>
							<S.StepWrapper>
								<S.StepHeader>{step.header}</S.StepHeader>
								<S.StepDescription>
									{parse(step.description)}
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
								</S.StepDescription>
							</S.StepWrapper>
							<S.Asset>
								<ReactSVG src={ASSETS[`aboutStepsLogo${index + 1}`]} />
							</S.Asset>
						</S.Section>
					))}
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}
