import React from 'react';

import { ArtifactEnum, getRendererEndpoint, RENDER_WITH_VALUES } from 'arcframework';

import { DOM } from 'helpers/config';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactRendererSingle(props: IProps) {
	const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

	const [wrapperClass, setWrapperClass] = React.useState<string | null>(null);

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

	React.useEffect(() => {
		let wrapperClass: string | null = null;
		switch (props.artifactType) {
			case ArtifactEnum.Image:
				wrapperClass = 'wrapper-full';
				break;
			case ArtifactEnum.Webpage:
			case ArtifactEnum.Ebook:
			case ArtifactEnum.File:
			case ArtifactEnum.Document:
			case ArtifactEnum.Video:
				wrapperClass = 'wrapper-full border-wrapper';
				break;
			case ArtifactEnum.Messaging:
			case ArtifactEnum.Nostr:
			case ArtifactEnum.Reddit:
			case ArtifactEnum.Audio:
				wrapperClass = 'wrapper-600 border-wrapper';
				break;
		}
		setWrapperClass(wrapperClass);
	}, [props.artifactType]);

	return props.artifactId ? (
		<S.Wrapper>
			<div className={wrapperClass ? wrapperClass : ''}>
				<S.Frame
					id={DOM.renderer}
					ref={iframeRef}
					src={getRendererEndpoint(RENDER_WITH_VALUES[0], props.artifactId)}
					allowFullScreen
				/>
			</div>
		</S.Wrapper>
	) : null;
}
