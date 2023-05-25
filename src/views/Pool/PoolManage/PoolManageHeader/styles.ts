import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	margin: 0 0 40px 0;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: start;
		h2 {
			margin: 0 0 10px 0;
		}
	}
`;

export const H1 = styled.div``;

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

export const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const H2 = styled.div`
	min-height: 135.5px;
	width: 361.5px;
	max-width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 15px;
	position: relative;
`;

export const PoolBalance = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	p {
		font-size: ${(props) => props.theme.typography.size.lg} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	}
`;

export const ProgressWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	margin: 20px 0 0 0;
`;

export const PIWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	p {
		text-align: center;
		margin: 10px 0 0 0;
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	}
`;

export const ProgressIndicator = styled.button<{ completed: boolean }>`
	height: 40px;
	width: 40px;
	border: 1.5px solid ${(props) => props.theme.colors.border.alt4};
	border-radius: 50%;
	background: ${(props) =>
		props.completed ? props.theme.colors.notification.success : props.theme.colors.button.primary.hover};
	position: relative;
	svg {
		height: 15px;
		width: 15px;
		position: absolute;
		top: 52.5%;
		width: 50%;
		transform: translate(-50%, -50%);
	}
	&:hover {
		cursor: default;
	}
`;

export const ProgressDivider = styled.div`
	height: 2px;
	width: 75px;
	margin: 20px 0 0 0;
	border-top: 2px solid ${(props) => props.theme.colors.border.alt4};
`;

export const PD1 = styled(ProgressDivider)`
	margin: 20px 0 0 12.5px;
`;

export const PD2 = styled(ProgressDivider)`
	margin: 20px 15px 0 0;
`;

export const FlexTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	height: fit-content;
	width: fit-content;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const Tile = styled.div`
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 15px;
	position: relative;
	display: flex;
	align-items: center;
	width: fit-content;
`;

export const TileTitle = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;

export const TileData = styled.div`
	display: flex;
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const TContainer = styled.div`
	margin: 0.15px 0 0 4.5px;
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary.alt2};
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

export const TileInfo = styled.div`
	margin: 2.5px 0 0 10px;
`;

export const PoolBalanceInfo = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
`;
