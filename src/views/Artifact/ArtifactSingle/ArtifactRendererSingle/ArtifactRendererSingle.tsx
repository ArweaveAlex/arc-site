import React from 'react';

import { getRendererEndpoint, RENDER_WITH_VALUES } from 'arcframework';

import { DOM } from 'helpers/config';

import { IProps } from '../types';

import * as S from './styles';

export default function ArtifactRendererSingle(props: IProps) {
	const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

	React.useEffect(() => {
		function handleMessage(event: any) {
			const { frameHeight, frameId } = event.data;

			if (frameId === DOM.renderer && iframeRef.current) {
				iframeRef.current.style.height = `${frameHeight}px`;
			}
		}

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	return (
		<S.Wrapper>
			<S.Frame
				id={DOM.renderer}
				ref={iframeRef}
				src={getRendererEndpoint(RENDER_WITH_VALUES[0], props.data.artifactId)}
				allowFullScreen
			/>
		</S.Wrapper>
	);
}
