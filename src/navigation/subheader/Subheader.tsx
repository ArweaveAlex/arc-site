import React from 'react';

import { Portal } from 'components/atoms/Portal';
import { Select } from 'components/atoms/Select';
import { DOM } from 'helpers/config';
import * as windowUtils from 'helpers/window';

import * as S from './styles';
import { IProps } from './types';

export default function Subheader(props: IProps) {
	const [activeNode, setActiveNode] = React.useState<{ id: string; display: string } | null>(null);

	const [desktop, setDesktop] = React.useState(windowUtils.checkDesktop());

	function handleWindowResize() {
		if (windowUtils.checkDesktop()) {
			setDesktop(true);
		} else {
			setDesktop(false);
		}
	}

	windowUtils.checkWindowResize(handleWindowResize);

	React.useEffect(() => {
		if (props.nodes && props.nodes.length) {
			setActiveNode(props.nodes[0]);
		}
	}, [props.nodes]);

	function handleClick(node: { id: string; display: string }) {
		windowUtils.scrollIntoView(node.id);
		setActiveNode(node);
	}

	function handleEvent(e: any) {
		handleClick(props.nodes.find((node: { id: string; display: string }) => node.display === e.target.value));
	}

	function getNav() {
		if (activeNode) {
			if (desktop) {
				return props.nodes.map((node: { id: string; display: string }, index: number) => {
					return (
						<S.Node key={index} onClick={() => handleClick(node)} active={node.id === activeNode.id}>
							{node.display}
						</S.Node>
					);
				});
			} else {
				return (
					<Select
						onChange={(e) => handleEvent(e)}
						display={null}
						value={activeNode.display}
						options={props.nodes.map((node: { id: string; display: string }) => node.display)}
						disabled={false}
					/>
				);
			}
		} else {
			return null;
		}
	}

	return (
		<Portal node={DOM.subheader}>
			<S.Wrapper>
				<S.Container>
					<S.Content>{getNav()}</S.Content>
				</S.Container>
			</S.Wrapper>
		</Portal>
	);
}
