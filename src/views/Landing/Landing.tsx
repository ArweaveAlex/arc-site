import React from "react";

import { useARProvder } from "providers/ARProvider";

import { Loader } from "components/atoms/Loader";

import { LandingHeader } from "./LandingHeader";
import { LandingCollections } from "./LandingCollections";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";
// import { LandingFAQLink } from "./LandingFAQLink";

import * as S from "./styles";

export default function Landing() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            setData(await arProvider.getAllPools());
        })()
    }, [arProvider])

    return data ? (
        <S.Wrapper>
            <LandingHeader />
            <LandingCollections data={data} />
            <LandingInfo />
            <LandingSteps />
            {/* <LandingFAQLink /> */}
        </S.Wrapper>
    ) : <Loader />
}