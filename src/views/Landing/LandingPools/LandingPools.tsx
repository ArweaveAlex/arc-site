import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Carousel } from "components/molecules/Carousel";

import { getTxEndpoint } from "helpers/endpoints";
import * as urls from "helpers/urls";
import { LANGUAGE } from "helpers/language";
import { PoolType } from "helpers/types";
import * as S from "./styles";
import { FALLBACK_IMAGE } from "helpers/config";

function PoolsCard(props: PoolType) {

    const [poolUrl, setPoolsUrl] = React.useState<string | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        setPoolsUrl(`${urls.pool}${props.id}`);
    }, [props.id])

    React.useEffect(() => {
        (async function () {
            const imageResponse = (await fetch(getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)));
            setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
        })()
    })

    return poolUrl && imageUrl ? (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{parse(props.state.briefDescription)}</S.Description>
                </S.C1Content>
                <Link to={poolUrl}>
                    <S.LinkContainer>
                        <span>{LANGUAGE.viewPools}</span>
                    </S.LinkContainer>
                </Link>
            </S.C1>
            <S.C2 image={imageUrl} />
        </S.PCWrapper>
    ) : null
}

export default function LandingPools(props: { data: PoolType[] }) {
    function getPools() {
        return props.data.map((pool: PoolType) => {
            return (
                <PoolsCard {...pool} key={pool.id} />
            )
        })
    }

    return (
        <S.Wrapper>
            <Carousel title={LANGUAGE.activePools} data={getPools()} />
        </S.Wrapper>
    )
}