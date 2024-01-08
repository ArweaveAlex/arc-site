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
	height: fit-content;
	width: 361.5px;
	max-width: 100%;
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
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		max-width: 115px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
	display: flex;
	align-items: center;
	margin: 2.5px 0 0 10px;
	> * {
		&:not(:last-child) {
			margin: 0 7.5px 0 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;

export const TAction = styled.div`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translate(0, -50%);
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		}
	}
`;

export const PoolBalanceInfo = styled.div`
	p {
		line-height: 1.5;
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;

export const FundsNotificationMessage = styled.div`
	margin: 20px 0 0 0;
	p {
		line-height: 1.5;
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const MWrapper = styled.div``;

export const MForm = styled.form``;

export const MFormField = styled.div`
	margin: 25px 0 0 0;
	max-width: 300px;
	margin: 50px auto 0px;
`;

export const MText = styled.div`
	p {
		line-height: 1.65;
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;

export const MHeader = styled.div`
	height: 30%;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 0 20px 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: auto;
	}
`;

export const MHeaderFlex = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 0 10px 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: fit-content;
		flex-direction: column;
	}
`;

export const MH2 = styled.h2`
	font-size: 28px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const MActions = styled.div`
	width: fit-content;
	display: flex;
	margin: 0 auto 20px auto;
	> * {
		&:not(:last-child) {
			margin: 0 15px 0 0;
		}
	}
`;

export const BalanceWrapper = styled.div`
	display: flex;
	margin: 20px 0 0 0;
`;

export const AvailableBalance = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	line-height: 18px;
	white-space: nowrap;
	overflow: hidden;
`;

export const BalanceAmount = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-size: 18px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const ARTokens = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt4};
	font-size: 18px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
`;
