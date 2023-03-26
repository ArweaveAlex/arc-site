import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: calc(${STYLING.dimensions.navHeight} + 20px) auto 0 auto;
	padding: 0 20px;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 30px 20px;
	margin: 0 0 40px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		flex-direction: column;
		align-items: start;
		padding: 20px;
	}
`;

export const HeaderContainer = styled.div``;

export const FlexHeader = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-wrap: wrap;
	}
`;

export const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
        align-items: flex-start;
	}
`;

export const ProfileFlex = styled.div`
    display: flex;
    align-items: center;
`;


export const SocialLinks = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 20px 0 0 0;
	}
`;

export const SocialLink = styled.div`
    margin: 0 10px 0 0;
    display: flex;
    position: relative;
    p {
        font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
    }
`;

export const AvatarWrapper = styled.div`
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid ${(props) => props.theme.colors.border.primary};
    border-radius: 50%;
    svg {
        height: 32.5px;
        width: 32.5px;
        stroke: ${(props) => props.theme.colors.icon.alt1.fill};
    }
`;

export const Avatar = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 50%;
`;

export const Info = styled.div`
    display: flex;
    margin: 0 25px;
    p, span {
        font-size: clamp(16px, 2.5vw, 24px);
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
    p {
        color: ${(props) => props.theme.colors.font.primary.active.base};
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    @media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
	}
`;

export const ShareWrapper = styled.div`
	height: 100%;
	width: fit-content;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		margin: 20px 0 0 0;
	}
`;

export const URLCopied = styled.div`
	position: absolute;
	top: -25px;
	left: -100px;
	z-index: 3;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 6.5px 15px 5px 15px;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		bottom: auto;
		left: 170px;
	}
`;

export const DiscordHandleCopied = styled(URLCopied)`
    top: -25.5px;
    left: 32.5px;
`;

export const TabsWrapper = styled.div`
	height: calc(100% - 200px);
	width: 100%;
`;

export const H1 = styled.h1`
	font-size: 28px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Header1 = styled(H1)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
`;

export const Header2Container = styled.div`
	width: fit-content;
	position: relative;
	display: flex;
	align-items: center;
`;

export const Header2 = styled(Header1)`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.primary.alt4};
`;
