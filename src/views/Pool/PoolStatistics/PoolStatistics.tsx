// import { PoolRecentlyMinted } from "./PoolRecentlyMinted";
import { PoolContributors } from "./PoolContributors";

import { IProps } from "./types";
import * as S from "./styles";

export default function PoolStatistics(props: IProps) {
    // TODO - Cache PoolRecentlyMinted

    return (
        <S.Wrapper>
            {/* <PoolRecentlyMinted data={props.detailData.contracts.slice(0, 5)} /> */}
            <PoolContributors data={props.headerData} />
        </S.Wrapper>
    )
}