import styled, { DefaultTheme } from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';
import { AlignType } from 'helpers/types';

export const Wrapper = styled.div`
	width: 100%;
	animation: ${open} ${fadeIn2};
	scroll-margin-top: 100px;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		height: auto;
		scroll-margin-top: 20px;
	}
`;

export const Header = styled.div`
	width: 100%;
	margin: 0 0 25px 0;
	display: flex;
	flex-direction: column;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: auto;
		margin: 0 0 15px 0;
	}
`;

export const HeaderFlex = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const H2 = styled.h2`
	font-size: 28px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: ${(props) => props.theme.colors.font.primary.alt4};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Body = styled.div`
	width: 100%;
	margin: 0 0 20px 0;
	display: flex;
	flex-direction: column;
	overflow-x: auto;
	overflow-y: hidden;
	animation: ${open} ${fadeIn2};
	min-height: 66.5vh;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export const Table = styled.div`
	height: 100%;
	width: 100%;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	> * {
		&:last-child {
			border-bottom: none;
			border-bottom-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
			border-bottom-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: ${STYLING.cutoffs.initial};
	}
`;

export const TableHeader = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	overflow: hidden;
`;

function getRowStyle(theme: DefaultTheme, active: boolean, viewed: boolean) {
	if (active) {
		return `
			background: ${theme.colors.table.row.active.background};
		`;
	} else {
		if (viewed) {
			return `
				background: ${theme.colors.container.primary.hover};
			`;
		} else {
			return `
				background: ${theme.colors.container.primary.background};
			`;
		}
	}
}

export const Row = styled.div<{ active: boolean; viewed: boolean }>`
	height: 40px;
	display: flex;
	align-items: center;
	${(props) => getRowStyle(props.theme, props.active, props.viewed)};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	&:hover {
		background: ${(props) =>
			props.active ? props.theme.colors.table.row.active.background : props.theme.colors.container.primary.hover};
	}
`;

export const RowData = styled.div`
	height: 100%;
	display: flex;
	padding: 0 10px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	align-items: center;
	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 20px;
		margin: 5.5px 0 0 0;
	}
`;

export const THeader = styled(RowData)<{
	even: boolean;
	width: string;
	align: AlignType;
}>`
	width: ${(props) => props.width};
	min-width: 60px;
	display: flex;
	justify-content: ${(props) => props.align};
	p {
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const TData = styled(RowData)<{
	even: boolean;
	width: string;
	active: boolean;
}>`
	width: ${(props) => props.width};
	min-width: 60px;
	background: none;
	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	}
`;

export const NoArtifactsContainer = styled.div`
	height: 100%;
	width: 100%;
	p {
		color: ${(props) => props.theme.colors.warning};
	}
`;
