import React from 'react';

import { formatAddress } from 'arcframework';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { useFileTx } from 'hooks/useFileTx';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactAudioSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const audioRef = React.useRef<HTMLAudioElement>(null);

	const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [volume, setVolume] = React.useState(0.5);
	const [progress, setProgress] = React.useState(0);

	const [elapsedTime, setElapsedTime] = React.useState('00:00');
	const [remainingTime, setRemainingTime] = React.useState('00:00');

	const [isDurationAvailable, setIsDurationAvailable] = React.useState(false);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const updateTime = () => {
		if (audioRef.current) {
			const duration = audioRef.current.duration;
			if (duration && !isNaN(duration) && duration > 0) {
				const newProgress = (audioRef.current.currentTime / duration) * 100;
				setProgress(newProgress);
				setElapsedTime(formatTime(audioRef.current.currentTime));
				setRemainingTime(formatTime(duration - audioRef.current.currentTime));
			} else {
				setProgress(0);
				setElapsedTime(formatTime(audioRef.current.currentTime));
				setRemainingTime('--:--');
			}
		}
	};

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newProgress = parseFloat(e.target.value);
		setProgress(newProgress);
		if (audioRef.current) {
			audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
		}
	};

	React.useEffect(() => {
		(async function () {
			const response = await fetch(txData.fileUrl);
			const arrayBuffer = await response.arrayBuffer();
			const blob = new Blob([arrayBuffer]);
			const url = URL.createObjectURL(blob);
			setAudioUrl(url);

			return () => {
				URL.revokeObjectURL(url);
			};
		})();

		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	}, [txData.fileUrl]);

	React.useEffect(() => {
		if (audioRef.current) {
			const handleMetadataLoaded = () => {
				setIsDurationAvailable(true);
			};
			audioRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
			return () => {
				audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
			};
		}
	}, [audioRef.current]);

	React.useEffect(() => {
		if (isDurationAvailable) {
			const duration = audioRef.current.duration;
			setRemainingTime(formatTime(duration - audioRef.current.currentTime));
		}
	}, [isDurationAvailable, audioRef.current, formatTime]);

	return props.data && audioUrl ? (
		<S.Wrapper className={'border-wrapper'}>
			<S.Audio
				ref={audioRef}
				src={audioUrl}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onTimeUpdate={updateTime}
			></S.Audio>
			<S.Content>
				<S.C1>
					<S.Section1>
						<S.NID>
							<S.Name>{props.data.artifactName}</S.Name>
							<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
						</S.NID>
						<S.PlayWrapper playing={!isPlaying}>
							<IconButton
								type={'alt1'}
								src={isPlaying ? ASSETS.mediaPause : ASSETS.mediaPlay}
								handlePress={togglePlayPause}
								tooltip={isPlaying ? LANGUAGE.pause : LANGUAGE.play}
								dimensions={{
									wrapper: 35,
									icon: 20.5,
								}}
							/>
						</S.PlayWrapper>
					</S.Section1>
					<S.VolumeWrapper>
						<S.V1>
							<p>{LANGUAGE.volume}</p>
						</S.V1>
						<S.VolumeBar
							type={'range'}
							className={'custom-range'}
							min={'0'}
							max={'1'}
							step={'0.01'}
							value={volume.toString()}
							onChange={handleVolumeChange}
						/>
					</S.VolumeWrapper>
				</S.C1>
				<S.ProgressWrapper>
					<S.ProgressBar
						type={'range'}
						className={'custom-range'}
						min={'0'}
						max={'100'}
						step={'0.1'}
						value={progress.toString()}
						onChange={handleProgressChange}
					/>
					<S.TimeWrapper>
						<p>{elapsedTime}</p>
						<p>{remainingTime}</p>
					</S.TimeWrapper>
				</S.ProgressWrapper>
			</S.Content>
		</S.Wrapper>
	) : null;
}
