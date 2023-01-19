import styled from "styled-components/macro";

export const TypeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        width: 17.5px;
        fill: ${(props) => props.theme.colors.font.primary.active.base};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const LinkWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

export const ALinkWrapper = styled.div`
    width: 75%;
    display: flex;
`;

export const ALink = styled.div`
    width: fit-content;
    max-width: calc(100% - 35px);
    display: flex;
    align-items: center;
    a {
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

export const ALinkNT = styled.div`
    height: 100%;
    width: 30px;
    margin: 0 0 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        width: 12.5px;
        fill: ${(props) => props.theme.colors.button.alt1.background};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover {
            fill: ${(props) => props.theme.colors.button.alt1.hover};
        }
    }
`;

export const PLink = styled(ALink)`
    max-width: none;
`;

export const Icons = styled.div`
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    position: relative;
    position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    svg {
        width: 12.5px;
        margin: 0 0 0 20px;
        fill: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;

export const AssociationIcon = styled.div`
    svg {
        width: 15px;
        margin: 0 0 0 20px;
        fill: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;

export const CollectionToggle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        fill: ${(props) => props.theme.colors.icon.alt1.fill} !important;
        margin: 0 0 5px 0;
    }
    button {
        margin: 7.5px 0 0 0;
    }
`;