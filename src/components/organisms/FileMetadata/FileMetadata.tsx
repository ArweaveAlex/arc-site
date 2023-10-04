import { Loader } from 'components/atoms/Loader';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function FileMetadata(props: IProps) {
	function getBodyWrapper(body: React.ReactNode) {
		return (
			<S.C2>
				<S.C2Header>
					<p>{language.artifactDetails}</p>
				</S.C2Header>
				<S.C2Body>{body}</S.C2Body>
			</S.C2>
		);
	}

	function getBody() {
		if (props.metadata && Object.keys(props.metadata).length > 0) {
			const body = Object.keys(props.metadata).map((key) => {
				return (
					<S.ContentLine key={key}>
						<S.InfoData>
							<span>{key}</span>
							<S.BodyData>{props.metadata[key]}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
				);
			});
			return getBodyWrapper(body);
		} else {
			if (props.metadata && Object.keys(props.metadata).length <= 0) {
				return null;
			} else {
				const body = Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
					return (
						<S.BP key={element}>
							<Loader placeholder />
						</S.BP>
					);
				});
				return getBodyWrapper(body);
			}
		}
	}

	return <S.Wrapper>{getBody()}</S.Wrapper>;
}
