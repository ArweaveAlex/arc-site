import { PoolRecentlyMinted } from "./PoolRecentlyMinted";
import { PoolContributors } from "./PoolContributors";

import { IProps } from "./types";
import * as S from "./styles";

export default function PoolStatistics(props: IProps) {
    // function checkProps() {
    //     return props.detailData && 
    //         props.detailData.contracts.length >= 5 &&
    //         props.headerData &&
    //         props.headerData.state.contributors &&
    //         Object.keys(props.headerData.state.contributors).length > 0;
    // }

    function checkProps() {
        return props.headerData &&
            props.headerData.state.contributors &&
            Object.keys(props.headerData.state.contributors).length > 0;
    }

    return checkProps() ? (
        <S.Wrapper>
            {/* <PoolRecentlyMinted data={props.detailData.contracts.slice(0, 5)} /> */}
            <PoolContributors data={props.headerData} />
        </S.Wrapper>
    ) : null;
}