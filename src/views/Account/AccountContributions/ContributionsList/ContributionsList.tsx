// import { ReactSVG } from "react-svg";

import * as util from "@/util";
// import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

import { MOCK_DATA_HEADER } from "@/mock-data";

export default function ContributionsList() {
    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.H2>{LANGUAGE.contributions}</S.H2>
                </S.HeaderFlex>
            </S.Header>
            <S.List>
                {MOCK_DATA_HEADER.map((collection: any, index: number) => {
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
                                        <S.Subheader2><p>{util.formatDate(collection.state.dateCreated)}</p></S.Subheader2>
                                    </S.SubheaderContainer>
                                </S.SubheaderFlex>
                            </S.LIHeaderContainer>
                            <S.LIBodyContainer>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>Total Contributed:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>200 $AR</S.LIBodyData>
                                </S.LIBodyFlex>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>Last Contribution:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>November 7th, 2021 for 100 $AR</S.LIBodyData>
                                </S.LIBodyFlex>
                                <S.LIBodyFlex>
                                    <S.LIBodyHeader>Receiving:</S.LIBodyHeader>
                                    &nbsp;
                                    <S.LIBodyData>5% of Artifacts Created</S.LIBodyData>
                                </S.LIBodyFlex>
                            </S.LIBodyContainer>
                            {/* <S.LIDropdownContainer>
                                <S.LIButton onClick={() => console.log('test')}>
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