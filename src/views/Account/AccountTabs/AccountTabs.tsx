import React from "react";
import { useArjs } from "arjs-react";
// import { ReactSVG } from "react-svg";

// import { useARProvder } from "@/providers/ARProvider";

import { URLTabs } from "@/components/organisms/URLTabs";

// import * as urls from "@/urls";
import * as util from "@/util";
import { URLS } from "@/config";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

export default function AccountTabs() {
    // const arJsWallet = useArjs();
    // const { walletAddress } = useARProvder();

    // console.log(connected)

    // const permissions = { permissions: ["SIGN_TRANSACTION"] };

    const [address, setAddress] = React.useState("");
    // const [connected, setConnected] = React.useState(false);

    // React.useEffect(() => {
    //     const walletStorageItem = localStorage.getItem(APP.walletStorage);
    //     if (walletStorageItem && arJsWallet.status !== "connected") {
    //         arJsWallet.connect(walletStorageItem, permissions)
    //     }
    // })

    // React.useEffect(() => {
    //     setConnected(arJsWallet.status === "connected");
    // })

    // React.useEffect(() => {
    //     async function getAddress() {
    //         setAddress(await arJsWallet.getAddress())
    //     }
    //     if (connected) {
    //         getAddress();
    //     }
    // })

    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <S.HeaderContent>
                    <S.HeaderContainer>
                        <S.FlexHeader>
                            <S.Header1>{LANGUAGE.account.header1}</S.Header1>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <S.Header2Container>
                                <S.Header2>{util.formatAddress(address, true)}</S.Header2>
                            </S.Header2Container>
                        </S.FlexHeader>
                    </S.HeaderContainer>
                </S.HeaderContent>
            </S.HeaderWrapper>
            <S.TabsWrapper>
                <URLTabs tabs={URLS.account} activeUrl={URLS.account[0]!.url} />
            </S.TabsWrapper>
        </S.Wrapper>
    )
}