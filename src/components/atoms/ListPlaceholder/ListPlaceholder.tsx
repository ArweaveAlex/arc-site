import { Loader } from '../Loader';

import * as S from './styles';
import { IProps } from './types';

export default function ListPlaceholder(props: IProps) {
	return (
		<S.PlaceholderWrapper>
			{Array.from({ length: props.rowCount }, (_, i) => i + 1).map((element: number) => {
				return (
					<S.PlaceholderContainer key={element}>
						<S.Placeholder rowHeight={props.rowHeight} rowMargin={props.rowMargin}>
							<Loader placeholder />
						</S.Placeholder>
					</S.PlaceholderContainer>
				);
			})}
		</S.PlaceholderWrapper>
	);
}
