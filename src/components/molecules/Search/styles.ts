import styled from 'styled-components';

import { fadeIn1, open, openRight } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const DWrapper = styled.div`
	position: relative;
`;

export const DSearchWrapper = styled.div`
	position: relative;
`;

export const RWrapper = styled.div`
	width: 100%;
	position: relative;
`;

export const DSearchIcon = styled.div<{ disabled: boolean | undefined }>`
    svg {
        position: absolute;
        top: 8.175px;
        left: 15.5px;
        width: 15px;
        fill ${(props) => props.theme.colors.icon.alt2.fill};
        &:hover {
            cursor: ${(props) => (props.disabled ? 'default' : 'default')};
        }
    }
`;

export const DInput = styled.input<{ disabled: boolean; invalid: boolean; hasData: boolean }>`
	height: 40px;
	width: 600px;
	max-width: 39.5vw;
	color: ${(props) => props.theme.colors.font.primary.alt8};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	background: ${(props) => props.theme.colors.form.background};
	border: 1px solid ${(props) => props.theme.colors.form.border};
	border-radius: 20px;
	padding: 10px 35px 10px 42.5px;
	&:focus {
		outline: 0;
		opacity: 1;
		box-shadow: 0 0 4.5px ${(props) => props.theme.colors.form.valid.shadow};
		border: 1px solid ${(props) => props.theme.colors.form.valid.outline};
		transition: box-shadow, border 225ms ease-in-out;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		font-size: ${(props) => props.theme.typography.size.base};
	}
`;

export const DClearWrapper = styled.div`
	position: absolute;
	z-index: 1;
	right: 15.5px;
	top: 53.5%;
	transform: translate(0, -50%);
	svg {
		margin: 0 0 0.5px 0;
	}
`;

export const DResultsWrapper = styled.div`
	max-height: 75vh;
	width: 100%;
	position: absolute;
	margin: 5px 0 0 0;
	overflow: auto;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export const DLWrapper = styled.div`
	padding: 10px 15px;
	span {
		color: ${(props) => props.theme.colors.font.primary.alt8};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const DRWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 0;
`;

export const AWrapper = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	animation: ${open} ${fadeIn1};
	border-left: 4.5px solid transparent;
	transition: all 75ms;
	&:hover {
		border-left: 4.5px solid ${(props) => props.theme.colors.border.alt1};
		background: ${(props) => props.theme.colors.container.primary.hover};
	}
	a {
		height: 100%;
		width: 100%;
		padding: 10px;
		text-decoration: none !important;
	}
`;

export const AInfo = styled.div`
	max-width: 95%;
	display: flex;
`;

export const AIcon = styled.div`
	svg {
		width: 15px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
		margin: 4.5px 15px 0 0;
	}
`;

export const AInfo1 = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary.alt8} !important;
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		line-height: 1.5;
	}
	a,
	button,
	span {
		display: inline-block;
		color: ${(props) => props.theme.colors.font.primary.alt7};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	a {
		text-decoration: none !important;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const AInfoFlex = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 5px 0 0 0;
`;

export const ATLoader = styled.div`
	height: 17.5px;
	width: 250px;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	overflow: hidden;
`;

export const AILoader = styled(ATLoader)`
	height: 14.5px;
	width: 200px;
`;

export const MWrapper = styled.button`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const MIconWrapper = styled.div`
	svg {
		width: 12.5px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
		margin: 4.25px 0 0 11.5px;
	}
`;

export const MSWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	position: fixed;
	z-index: 11;
	top: 0;
	right: 0;
	transition: width 50ms ease-out;
	background: ${(props) => props.theme.colors.overlay.primary};
	backdrop-filter: blur(2.5px);
	border: none;
	animation: ${openRight} 200ms;
`;

export const MSearchWrapper = styled(DSearchWrapper)`
	height: 55px;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background: ${(props) => props.theme.colors.container.alt3.background};
`;

export const MCloseWrapper = styled.div`
	position: absolute;
	left: 15px;
	z-index: 1;
`;

export const MRWrapper = styled(RWrapper)`
	width: calc(100% - 50px);
	position: absolute;
	right: 10px;
`;

export const MInput = styled(DInput)`
	max-width: 100%;
	border: 1px solid ${(props) => props.theme.colors.form.border};
	border-radius: 20px;
	margin: auto;
	&:focus {
		border: 1px solid ${(props) => props.theme.colors.form.border};
	}
`;

export const MResultsWrapper = styled(DResultsWrapper)`
	max-height: calc(100vh - 55px);
	margin: 0;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: none;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	box-shadow: none;
	border-radius: 0;
	overflow: auto;
	::-webkit-scrollbar {
		width: 0px;
	}
`;
