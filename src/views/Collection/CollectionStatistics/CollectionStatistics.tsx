import { CollectionRecentlyMinted } from "./CollectionRecentlyMinted";
import { CollectionContributors } from "./CollectionContributors";

import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionStatistics(props: IProps) {
    function checkProps() {
        return props.detailData && 
            props.detailData.contracts.length >= 5 &&
            props.headerData &&
            props.headerData.state.contributors &&
            Object.keys(props.headerData.state.contributors).length > 0;
    }

    return checkProps() ? (
        <S.Wrapper>
            <CollectionRecentlyMinted data={props.detailData.contracts.slice(0, 5)} />
            <CollectionContributors data={props.headerData} />
        </S.Wrapper>
    ) : null;
}