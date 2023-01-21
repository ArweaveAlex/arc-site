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
    a, span, b {
        font-size: ${(props) => props.theme.typography.size.xSmall};
    }
    a {
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    span, b {
        color: ${(props) => props.theme.colors.font.primary.alt4};
        font-weight: ${(props) => props.theme.typography.weight.medium};
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
    width: 80px;
    display: flex;
    position: absolute;
    right: 0;
    svg {
        width: 12.5px;
        fill: ${(props) => props.theme.colors.font.primary.active.base};
    }
`;

export const Icon = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: end;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    right: auto;
    transform: translate(0, -50%);
`;

export const AssociationIcon = styled(Icon)`
    right: 0;
    left: auto;
    svg {
        width: 15px;
        fill: ${(props) => props.theme.colors.font.primary.active.base};
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