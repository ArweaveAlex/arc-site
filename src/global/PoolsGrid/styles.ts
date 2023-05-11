import styled from 'styled-components';

import { fadeIn2, loadingSlide, open, openLeft } from 'helpers/animations';
import { getImageShadow, STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
`;

export const SubheaderFlex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	margin: 0 0 20px 0;
`;

export const FilterWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	button {
		svg {
			height: 30px !important;
			width: 20px !important;
		}
	}
`;

export const CurrentFilter = styled.div`
	height: 33.5px;
	width: fit-content;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-radius: 25px;
	background: ${(props) => props.theme.colors.container.alt4.background};
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		margin: 0 10.5px 0 0;
	}
	button {
		margin: 0;
		padding: 1.5px 0 0 0;
		svg {
			height: 12.5px !important;
			width: 12.5px !important;
		}
	}
`;

export const FOWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 6;
	background: ${(props) => props.theme.colors.overlay.alt1};
	backdrop-filter: blur(3px);
`;

export const FOContent = styled.div`
	height: 100%;
	width: 250px;
	overflow: hidden;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${openLeft} 0.2s ease-out forwards;
`;

export const FOTitle = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const FOList = styled.ul`
	height: calc(100% - 50px);
	width: 100%;
	overflow: auto;
`;

export const FOListItem = styled.li<{ disabled: boolean; active: boolean }>`
	pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
	text-align: center;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 13px;
	line-height: 1.35;
	color: ${(props) => (props.active ? props.theme.colors.font.primary.base : props.theme.colors.font.primary.alt1)};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border-bottom: 1px solid
		${(props) => (props.disabled ? props.theme.colors.button.alt2.disabled.border : props.theme.colors.border.primary)};
	background: ${(props) =>
		props.disabled
			? props.theme.colors.button.alt2.disabled.background
			: props.active
			? props.theme.colors.button.alt2.active.background
			: props.theme.colors.button.alt2.background};
	padding: 10px 15px;
	&:hover {
		background: ${(props) =>
			props.disabled
				? props.theme.colors.button.alt2.disabled.background
				: props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const Body = styled.div`
	min-height: 500px;
	width: calc(100% + 25px);
	display: flex;
	flex-wrap: wrap;
	margin: -12.5px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 0;
	}
`;

export const C2 = styled.div<{ image: string }>`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	background-position: center;
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		cursor: pointer;
	}
	img {
		display: block;
		object-fit: cover;
	}
`;

export const Action = styled.button`
	height: 42.5px;
	width: 100%;
	background: ${(props) => props.theme.colors.button.neutral.background};
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		background: ${(props) => props.theme.colors.button.neutral.hover};
	}
	&:disabled {
		background: ${(props) => props.theme.colors.button.disabled};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: 15px;
	}
	svg {
		margin: 0 0 0 10px;
		width: 20px;
	}
`;

export const Info = styled.div`
	height: calc(100% - 42.5px);
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	transition: background 0.1s;
	padding: 20px;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	p,
	span {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		background: ${(props) => props.theme.colors.overlay.alt1};
		border-radius: 10px;
		width: fit-content;
	}
	p {
		padding: 6.5px 20px;
	}
	span {
		padding: 4.5px 20px;
	}
	&:hover {
		backdrop-filter: blur(2px);
		p,
		span {
			color: ${(props) => props.theme.colors.font.primary.alt2} !important;
		}
		svg {
			fill: ${(props) => props.theme.colors.font.primary.alt2} !important;
		}
	}
`;

export const InfoTitle = styled.div`
	margin: 0 0 10px 0;
	p,
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 24px;
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: ${(props) => props.theme.typography.size.base};
		font-size: 18px;
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const InfoCA = styled(InfoTitle)`
	margin: 0;
	p {
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
	span {
		display: flex;
		align-items: center;
		line-height: auto;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		svg {
			height: 12.5px;
			width: 15px;
			margin: 7.5px 0 0 10px;
			fill: ${(props) => props.theme.colors.font.primary.base};
		}
	}
	p,
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const PCWrapper = styled.div`
	height: 265px;
	width: calc(33.3% - 30px);
	animation: ${open} ${fadeIn2};
	margin: 15px;
	box-shadow: ${(props) => getImageShadow(props.theme)};
	border-radius: ${STYLING.dimensions.borderRadius};
	position: relative;
	a {
		height: calc(100% - 42.5px);
		width: 100%;
		display: block;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 300px;
		width: 100%;
		margin: 0 0 40px 0;
	}
`;

export const LP = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	background: linear-gradient(
			to right,
			${(props) => props.theme.colors.table.placeholder.backgroundStart},
			${(props) => props.theme.colors.table.placeholder.backgroundSlide} 50%,
			${(props) => props.theme.colors.table.placeholder.backgroundEnd} 80%
		),
		${(props) => props.theme.colors.table.placeholder.background};
	background-repeat: repeat-y;
	background-size: 50px 500px;
	background-position: 0 0;
	animation: ${loadingSlide} 1.25s infinite;
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const FetchAction = styled.div`
	width: fit-content;
	margin: 40px auto 0 auto;
`;

export const NoPoolsContainer = styled.div`
	margin: 12.5px 15px;
	height: fit-content;
	p {
		color: ${(props) => props.theme.colors.warning};
	}
`;
