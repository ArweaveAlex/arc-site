// import { ReactSVG } from "react-svg";

import * as util from "@/util";
// import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

export default function ContributionsList({data}) {
    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.H2>{LANGUAGE.contributions}</S.H2>
                </S.HeaderFlex>
            </S.Header>
            <S.List>
                {data.map((collection: any, index: number) => {
                    return (
                        <S.ListItemWrapper key={index}>
                            <S.LIHeaderContainer>
                                <S.LIHeader1>{collection.state.title}</S.LIHeader1>
                                <S.SubheaderFlex>
                                    <S.SubheaderContainer>
                                        <S.Subheader1><p>{LANGUAGE.collection.subheader1}</p></S.Subheader1>
                                        &nbsp;
                                        <S.ID><p>{util.formatAddress(collection.id, false)}</p></S.ID>
                                    </S.SubheaderContainer>
                                    &nbsp;
                                    <S.SubheaderContainer>
                                        <S.Subheader1><p>{LANGUAGE.collection.createdOn}</p></S.Subheader1>
                                        &nbsp;
                                        <S.Date><p>{util.formatDate(collection.ts, "epoch")}</p></S.Date>
                                    </S.SubheaderContainer>
                                </S.SubheaderFlex>
                            </S.LIHeaderContainer>
                            <S.LIBodyContainer>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>{LANGUAGE.totalContributed}:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>{`${collection.totalContributed} ${LANGUAGE.arTokens}`}</S.LIBodyData>
                                </S.LIBodyFlex>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>{LANGUAGE.lastContribution}:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>{util.formatDate(collection.lastContribution, "epoch")}</S.LIBodyData>
                                </S.LIBodyFlex>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>{LANGUAGE.receiving}:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>{collection.receivingPercent}% {LANGUAGE.artifactsCreated}</S.LIBodyData>
                                </S.LIBodyFlex>
                            </S.LIBodyContainer>
                            {/* <S.LIDropdownContainer>
                                <S.LIButton onClick={() => console.log('')}>
                                    <ReactSVG src={ASSETS.dropdown} />
                                </S.LIButton>
                            </S.LIDropdownContainer> */}
                        </S.ListItemWrapper>
                    )
                })}
            </S.List>
        </S.Wrapper>
    )
}