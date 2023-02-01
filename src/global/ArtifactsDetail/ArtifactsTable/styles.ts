import styled from 'styled-components/macro';

export const TypeContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	svg {
		width: 15px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const TypeLabel = styled.div`
	height: 100%;
	width: calc(100% - 25px);
	padding: 0 10px 0 0;
	display: flex;
	align-items: center;
	position: relative;
`;

export const Icons = styled.div`
	height: 100%;
	width: 25px;
	position: absolute;
	right: 0;
	border-left: 1px solid ${(props) => props.theme.colors.border.alt5};
	border-right: 1px solid ${(props) => props.theme.colors.border.alt5};
`;

export const Divider = styled.div`
	height: 1px;
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	border-top: 1px solid ${(props) => props.theme.colors.border.alt5};
`;

export const Icon = styled.div`
	height: 50%;
	width: 100%;
	position: absolute;
	top: 0;
	right: 0;
	svg {
		height: 100%;
		width: 10px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const AssociationIcon = styled(Icon)`
	top: auto;
	bottom: 0;
	svg {
		width: 12.5px;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
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
	a,
	span,
	b {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	a {
		line-height: 18px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	span,
	b {
		color: ${(props) => props.theme.colors.font.primary.alt4};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const PLink = styled(ALink)`
	max-width: 100%;
`;

export const CheckboxContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;