import styled from 'styled-components';

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
	width: 100%;
	padding: 0 10px 0 0;
	display: flex;
	align-items: center;
	position: relative;
`;

export const Icons = styled.div`
	height: 100%;
	width: 80px;
	display: flex;
	position: absolute;
	right: 0;
`;

export const Icon = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	justify-content: end;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 0;
	right: auto;
	transform: translate(0, -50%);
	svg {
		width: 10px;
		margin: 3.5px 0 0 0;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;

export const AssociationIcon = styled(Icon)`
	right: 0;
	left: auto;
	svg {
		width: 12.5px;
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
		font-size: ${(props) => props.theme.typography.size.xSmall};
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

export const StampContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
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
