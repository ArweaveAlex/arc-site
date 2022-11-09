import { Link } from "react-router-dom";

import { formatAddress, formatDate, getHashUrl } from "utils";
import * as urls from "urls";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function ContributionsList({ data }: any) {
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
                        <S.Link>
                            <Link to={getHashUrl(`${urls.collection}${collection.id}`)} key={index}>
                                <S.ListItemWrapper>
                                    <S.LIHeaderContainer>
                                        <S.LIHeader1>{collection.state.title}</S.LIHeader1>
                                        <S.SubheaderFlex>
                                            <S.SubheaderContainer>
                                                <S.Subheader1><p>{LANGUAGE.collection.subheader1}</p></S.Subheader1>
                                                &nbsp;
                                                <S.ID><p>{formatAddress(collection.id, false)}</p></S.ID>
                                            </S.SubheaderContainer>
                                            &nbsp;
                                            <S.SubheaderContainer>
                                                <S.Subheader1><p>{LANGUAGE.collection.createdOn}</p></S.Subheader1>
                                                &nbsp;
                                                <S.Date><p>{formatDate(collection.state.timestamp, "epoch")}</p></S.Date>
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
                                            <S.LIBodyData>{formatDate(collection.lastContribution, "epoch")}</S.LIBodyData>
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
                            </Link>
                        </S.Link>
                    )
                })}
            </S.List>
        </S.Wrapper>
    )
}