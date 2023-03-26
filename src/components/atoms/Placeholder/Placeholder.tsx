<<<<<<< HEAD:src/components/atoms/TableLoader/TableLoader.tsx
import * as S from './styles';
import { IProps } from './types';
=======
import { Loader } from '../Loader';
>>>>>>> dev:src/components/atoms/Placeholder/Placeholder.tsx

import * as S from './styles';
import { IProps } from './types';

export default function Placeholder(props: IProps) {
	return (
		<S.PlaceholderWrapper>
			{Array.from({ length: props.rowCount }, (_, i) => i + 1).map((element: number) => {
				return (
					<S.PlaceholderContainer key={element}>
						<S.Placeholder>
							<Loader placeholder />
						</S.Placeholder>
					</S.PlaceholderContainer>
				);
			})}
		</S.PlaceholderWrapper>
	);
}
