import React from "react";
import { ReactSVG } from "react-svg";

import { IconButton } from "@/components/atoms/IconButton";
import { WalletConnect } from "@/wallet/WalletConnect";

import { ASSETS, ASSET_SRC } from "@/config";
import { NAV_PATHS, SOCIAL_PATHS } from "@/paths";
import * as window from "@/window";
import * as S from "./styles";

export default function DynamicNaviation() {
    const [open, setOpen] = React.useState(window.checkDesktop());
    const [desktop, setDesktop] = React.useState(window.checkDesktop());

    function handleWindowResize() {
        if (window.checkDesktop()) {
            setDesktop(true);
            setOpen(true);
        } else {
            setDesktop(false);
            setOpen(false);
        }
    }

    function handleNavStatus() {
        window.checkDesktop() ? setOpen(true) : setOpen(!open);
    }

    window.checkWindowResize(handleWindowResize);

    if (open && !window.checkDesktop()) {
        window.hideDocumentBody();
    }
    else {
        window.showDocumentBody();
    }

    function navList() {
        return (
                <S.NC>
                    <S.NavPaths>
                        {NAV_PATHS.map((path, index) => (
                            <S.Link key={index} href={path.href}>
                                {path.name}
                            </S.Link>
                        ))}
                    </S.NavPaths>
                    <S.SC>
                        <S.SocialPaths>
                            {SOCIAL_PATHS.map((path, index) => (
                                <S.SocialLink key={index} href={path.href}>
                                    <ReactSVG src={`${ASSET_SRC}/${path.svg}`} />
                                </S.SocialLink>
                            ))}
                        </S.SocialPaths>
                        <S.Connect>
                            <WalletConnect setDynamicNavigationStatus={() => setOpen(false)}/>
                        </S.Connect>
                    </S.SC>
                </S.NC>
        );
    }

    function getNav() {
        if (desktop) {
            return navList();
        } else {
            return (
                <>
                    <S.NCMobile>
                        <S.MenuContainer>
                            <S.Menu>
                                <IconButton
                                    warning={open}
                                    src={open ? ASSETS.close : ASSETS.menu}
                                    handlePress={handleNavStatus}
                                />
                            </S.Menu>
                        </S.MenuContainer>
                    </S.NCMobile>
                    {open && <S.OpenContainer>{navList()}</S.OpenContainer>}
                </>
            );
        }
    }
    
    return getNav()
}