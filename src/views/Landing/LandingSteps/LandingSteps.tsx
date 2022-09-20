import parse from "html-react-parser";

import { language } from "@/language";
import * as S from "./styles";

export default function LandingSteps() {
    const stepList = language.steps.list;
    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.Header1>{language.steps.header1}</S.Header1>
                    <S.HeaderFlex>
                        <S.Header2>{parse(language.steps.header2)}</S.Header2>
                    </S.HeaderFlex>
                </S.Header>
                <S.Body>
                    <S.Asset>
                        <img src={"/assets/cycle.png"} />
                    </S.Asset>
                    <S.StepList>
                        {stepList.map((step, index) => (
                            <S.Step key={index}>
                                <S.StepHeader>
                                    {language.steps.display} {index + 1}
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