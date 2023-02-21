import parse from "html-react-parser";

import landingStepsAsset from "assets/cycle.png";

import { ASSETS } from "helpers/config";
import { LANGUAGE } from "helpers/language";
import * as S from "./styles";

export default function LandingSteps() {
  const stepList = LANGUAGE.steps.list;
  return (
    <S.Wrapper>
      <S.Content>
        <S.Header>
          <S.Header1>{LANGUAGE.steps.header1}</S.Header1>
          <S.HeaderFlex>
            <S.Header2>{parse(LANGUAGE.steps.header2)}</S.Header2>
          </S.HeaderFlex>
        </S.Header>
        <S.Body>
          <S.Asset
            style={{ backgroundImage: `url(${landingStepsAsset})` }}
            image={ASSETS.cycle}
          />
          <S.StepList>
            {stepList.map((step, index) => (
              <S.Step key={index}>
                <S.StepHeader>
                  {LANGUAGE.steps.display} {index + 1}
                </S.StepHeader>
                <S.StepBody>{parse(step)}</S.StepBody>
              </S.Step>
            ))}
          </S.StepList>
        </S.Body>
      </S.Content>
    </S.Wrapper>
  );
}
