import React from 'react';

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
				src={`https://arweave.net/8ILyMmC5vEZPjIErPEbW74vmpAXQuhNYkNRu_GmDwr8/?tx=${props.artifactId}`}
				allowFullScreen
			/>
		</S.Wrapper>
	) : null;
}
