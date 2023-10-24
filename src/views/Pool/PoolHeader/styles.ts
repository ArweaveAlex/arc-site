import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { getImageShadow, STYLING } from 'helpers/styling';

export const Wrapper = styled.div``;

export const HeaderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: start;
		h2 {
			margin: 0 0 10px 0;
		}
	}
`;

export const SubheaderFlex = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 20px 0 0 0;
		flex-direction: column;
	}
`;

export const SubheaderContainer = styled.div`
	display: flex;
	margin: 10px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 0 0 7.5px 0;
	}
`;

export const Subheader1 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		color: ${(props) => props.theme.colors.font.primary.alt6};
	}
`;

export const Subheader2 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		max-width: 67.5%;
	}
`;

export const ID = styled(Subheader2)`
	display: flex;
	position: relative;
	p {
		margin: 0 7.5px 0 0;
	}
`;

export const ImageContainer = styled.div`
	position: relative;
	height: 0;
	padding: 0 0 43.25% 0;
	margin: 30px 0 20px 0;
	animation: ${open} ${fadeIn2};
	border-radius: ${STYLING.dimensions.borderRadius};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		padding: 0 0 59.25% 0;
	}
`;

export const Image = styled.div<{ image: string }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-color: ${(props) => props.theme.colors.container.alt5.background};
	box-shadow: ${(props) => getImageShadow(props.theme)};
	border-radius: ${STYLING.dimensions.borderRadius};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const ImageLoading = styled.div`
	height: 590px;
	width: 100%;
	margin: 30px 0 20px 0;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
`;

export const FlexTiles = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const Tile = styled.div`
	height: 100px;
	width: 32.5%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 15px;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		margin: 0 0 20px 0;
	}
`;

export const ContributeTile = styled(Tile)`
	padding: 0;
	background: none;
	border: none;
`;

export const ContributeAction = styled.button`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.colors.button.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background: ${(props) => props.theme.colors.button.alt1.hover};
	}
	&:focus {
		background: ${(props) => props.theme.colors.button.alt1.hover};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.disabled};
		border: 1px solid ${(props) => props.theme.colors.button.disabled};
	}
`;

export const ContributeLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		width: 30px;
		margin: 0 20px 0 0;
	}
	span {
		font-size: 24px;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const TileTitle = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const TileData = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	p {
		font-size: 24px;
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		text-align: center;
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
	}
`;

export const TContainer = styled.div`
	margin: 1.15px 0 0 7.5px;
	p {
		font-size: 18px;
		line-height: 24px;
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary.alt2};
	}
`;

export const LongDescription = styled.div`
	width: 100%;
	margin: 30px 0 35px 0;
`;

export const LDHeader = styled.div`
	h2 {
		font-size: 24px;
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const LDBody = styled.div`
	margin: 20px 0;
	padding: 15px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-size: ${(props) => props.theme.typography.size.base};
	line-height: 1.5;
	overflow-wrap: anywhere;
	b {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.base};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-size: ${(props) => props.theme.typography.size.base};
		text-decoration: underline;
	}
`;

export const IDCopied = styled.div`
	position: absolute;
	bottom: 100%;
	left: 100%;
	z-index: 5;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 3.5px 12.5px 2.5px 17.5px;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
	}
`;
