import styled from 'styled-components/macro';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING, getImageShadow } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	padding: 0 20px 20px 20px;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	animation: ${open} ${fadeIn2};
	margin: 0 auto;
	overflow: hidden;
`;

export const SubheaderFlex = styled.div`
	display: flex;
	margin: 7.5px 0 20px 0;
	padding: 0 2.5px;
	margin: 20px 0;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		margin: 12.5px 0;
	}
`;

export const SubheaderContainer = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 12.5px 0 25px 0;
	}
`;

export const Subheader1 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.alt6};
	}
`;

export const Subheader2 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const Body = styled.div`
	width: calc(100% + 50px);
	display: flex;
	flex-wrap: wrap;
	margin: -25px;
	padding: 0 0 25px 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
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
	border-radius: ${STYLING.dimensions.borderRadius};
`;

export const Info = styled.div`
	position: absolute;
	top: 10px;
	right: 12.5px;
	padding: 6.5px 17.5px;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 5px ${(props) => props.theme.colors.shadow.alt1};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const InfoTitle = styled.div`
	p {
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 16px;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const PCWrapper = styled.div`
	height: 210px;
	width: calc(33.3% - 50px);
	animation: ${open} ${fadeIn2};
	margin: 25px;
	box-shadow: ${(props) => getImageShadow(props.theme)};
	border-radius: ${STYLING.dimensions.borderRadius};
	position: relative;
	a {
		height: 100%;
		width: 100%;
		display: block;
	}
	&:hover {
		cursor: pointer;
		&:hover ${C2} {
			opacity: 0.75;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 90vw;
		margin: 0 0 25px 0;
	}
`;
