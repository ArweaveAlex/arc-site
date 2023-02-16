import styled from 'styled-components/macro';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	scroll-margin-top: 25px;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
		scroll-margin-top: 20px;
	}
`;

export const Header = styled.div`
	width: 100%;
	margin: 0 0 25px 0;
	display: flex;
	flex-direction: column;
`;

export const HeaderFlex = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const H2 = styled.h2`
	font-size: 28px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: ${(props) => props.theme.colors.font.primary.alt4};
`;

export const List = styled.ol`
	width: 100%;
	margin: 0 0 20px 0;
	display: flex;
	flex-direction: column;
`;

export const Link = styled.div`
	margin: 0 0 20px 0;
	a {
		&:hover {
			text-decoration: none;
		}
		&:focus {
			text-decoration: none;
		}
	}
`;

export const ListItemWrapper = styled.li`
	height: 155px;
	width: 100%;
	padding: 20px;
	display: flex;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.hover};
	}
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
		flex-direction: column;
		padding: 25px;
	}
`;

export const LIHeaderContainer = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: calc(100% - 20px);
	}
`;

export const LIHeader1 = styled(H2)`
	font-size: 28px;
	line-height: 34px;
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const SubheaderFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		margin: 25px 0 0 0;
	}
`;

export const SubheaderContainer = styled.div`
	display: flex;
	overflow: hidden;
	margin: 0 0 7.5px 0;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		margin: 0 0 7.5px 0;
	}
`;

export const Subheader1 = styled.div`
	p {
		height: 20px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.alt6};
	}
`;

export const Subheader2 = styled.div`
	p {
		height: 20px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const ID = styled(Subheader2)``;

export const Date = styled(ID)``;

export const LIBodyContainer = styled.div`
	height: 100%;
	width: 45%;
	display: flex;
	flex-direction: column;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		width: calc(100% - 20px);
		margin: 20px 0 0 0;
	}
`;

export const LIBodyFlex = styled.div`
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		margin: 5px 0;
	}
`;

export const P = styled.p`
	height: 18px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const LIBodyHeader = styled(P)`
	color: ${(props) => props.theme.colors.font.primary.alt2};
`;

export const LIBodyData = styled(P)`
	height: auto;
	overflow: hidden;
	white-space: pre-wrap;
	line-height: 1.5;
	margin: 15px 0 0 0;
	color: ${(props) => props.theme.colors.font.primary.active.base};
`;

export const LIDropdownContainer = styled.div`
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	right: 20px;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		top: 20px;
		transform: translate(0, 0);
	}
`;

export const LIButton = styled.button`
	svg {
		width: 20px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
		&:hover {
			fill: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
`;

export const EWrapper = styled.div`
	width: 700px;
	max-width: 90vw;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt4.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.alt1};
	animation: ${open} ${fadeIn2};
`;

export const ELogo = styled.div`
	height: 150px;
	width: 150px;
	margin: 30px 0 0 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: 50%;

	svg {
		height: 50%;
		width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const ETitle = styled.div`
	margin: 30px 0;
`;

export const EInfo = styled.p`
	margin: 0 0 30px 0;
`;

export const ELink = styled.div`
	margin: 0 0 30px 0;
`;
