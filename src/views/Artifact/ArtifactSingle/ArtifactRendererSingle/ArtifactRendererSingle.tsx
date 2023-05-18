import React from 'react';

// import { getRendererEndpoint, RENDER_WITH_VALUES } from 'arcframework';
import { DOM } from 'helpers/config';

import * as S from './styles';
import { IProps } from './types';

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

	return props.artifactId ? (
		<S.Wrapper>
			<S.Frame
				id={DOM.renderer}
				ref={iframeRef}
				// src={getRendererEndpoint(RENDER_WITH_VALUES[0], props.artifactId)}
				src={`https://arweave.net/fxYuggf1GYJZpIVOo_XBaRmvWQQDGPIXRgsqD2QLJEQ/?tx=${props.artifactId}`}
				allowFullScreen
			/>
		</S.Wrapper>
	) : null;
}
