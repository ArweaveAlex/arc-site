import { IProps } from './types';
import * as S from './styles';

export default function TableLoader(props: IProps) {
	return (
		<S.PlaceholderWrapper>
			{Array.from({ length: props.rowCount }, (_, i) => i + 1).map((element: number) => {
				return (
					<S.PlaceholderContainer key={element}>
						<S.Placeholder />
					</S.PlaceholderContainer>
				);
			})}
		</S.PlaceholderWrapper>
	);
}
