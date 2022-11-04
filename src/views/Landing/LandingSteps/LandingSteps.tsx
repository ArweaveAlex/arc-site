import parse from "html-react-parser";

import { ASSETS } from "config";
import { LANGUAGE } from "language";
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
                    <S.Asset>
                        <img src={ASSETS.cycle} alt={""}/>
                    </S.Asset>
                    <S.StepList>
                        {stepList.map((step, index) => (
                            <S.Step key={index}>
                                <S.StepHeader>
                                    {LANGUAGE.steps.display} {index + 1}
                                </S.StepHeader>
                                <S.StepBody>
                                    {parse(step)}
                                </S.StepBody>
                            </S.Step>
                        ))}
                    </S.StepList>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}