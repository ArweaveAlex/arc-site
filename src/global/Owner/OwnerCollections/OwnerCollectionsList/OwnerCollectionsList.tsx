import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { ButtonLink } from "components/atoms/ButtonLink";

import { formatAddress, formatDate } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
import { ASSETS } from "helpers/config";
import * as urls from "helpers/urls";
import { IProps } from "./types";
import * as S from "./styles";

export default function OwnerCollectionsList(props: IProps) {
  function getData() {
    if (props.data) {
      if (props.data.length <= 0) {
        return (
          <S.EWrapper>
            <S.ELogo>
              <ReactSVG src={ASSETS.collections} />
            </S.ELogo>
            <S.ETitle>
              <S.H2>{LANGUAGE.collections}</S.H2>
            </S.ETitle>
            <S.EInfo>{LANGUAGE.createFirstCollection}</S.EInfo>
            <S.ELink>
              <ButtonLink
                type={"alt2"}
                label={LANGUAGE.create}
                href={`${urls.collectionsCreate}?owner=${props.owner}`}
                noMinWidth
              />
            </S.ELink>
          </S.EWrapper>
        );
      } else {
        return (
          <>
            <S.Header>
              <S.HeaderFlex>
                <S.H2>{LANGUAGE.collections}</S.H2>
                {props.showCreateCollections && (
                  <ButtonLink
                    type={"alt1"}
                    label={LANGUAGE.create}
                    href={`${urls.collectionsCreate}?owner=${props.owner}`}
                    noMinWidth
                  />
                )}
              </S.HeaderFlex>
            </S.Header>
            <S.List>
              {props.data.map((collection: any, index: number) => {
                return (
                  <S.Link key={index}>
                    <Link to={"#"}>
                      <S.ListItemWrapper>
                        <S.LIHeaderContainer>
                          <S.LIHeader1>{collection.state.title}</S.LIHeader1>
                          <S.SubheaderFlex>
                            <S.SubheaderContainer>
                              <S.Subheader1>
                                <p>{LANGUAGE.collection.subheader1}</p>
                              </S.Subheader1>
                              &nbsp;
                              <S.ID>
                                <p>{formatAddress(collection.id, false)}</p>
                              </S.ID>
                            </S.SubheaderContainer>
                            <S.SubheaderContainer>
                              <S.Subheader1>
                                <p>{LANGUAGE.createdOn}</p>
                              </S.Subheader1>
                              &nbsp;
                              <S.Date>
                                <p>
                                  {formatDate(
                                    collection.state.timestamp,
                                    "epoch"
                                  )}
                                </p>
                              </S.Date>
                            </S.SubheaderContainer>
                          </S.SubheaderFlex>
                        </S.LIHeaderContainer>
                        <S.LIBodyContainer>
                          <S.LIBodyFlex>
                            <S.LIBodyHeader>
                              {LANGUAGE.description}
                            </S.LIBodyHeader>
                            <S.LIBodyData>
                              {collection.state.description}
                            </S.LIBodyData>
                          </S.LIBodyFlex>
                        </S.LIBodyContainer>
                      </S.ListItemWrapper>
                    </Link>
                  </S.Link>
                );
              })}
            </S.List>
          </>
        );
      }
    } else {
      return null;
    }
  }

  return <S.Wrapper>{getData()}</S.Wrapper>;
}
