import { Link } from 'react-router-dom';

import { formatAddress, formatDate, PoolAdditionalPropsType, PoolClient } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function PoolTilesList(props: IProps) {
	const poolClient = new PoolClient();

	function getData() {
		if (props.data) {
			if (props.data.length <= 0) {
				return (
					<S.NoContributionsContainer>
						<p>{props.emptyDataMessage}</p>
					</S.NoContributionsContainer>
				);
			} else {
				return (
					<>
						{props.data.map((pool: PoolAdditionalPropsType, index: number) => {
							return (
								<S.Link key={index}>
									<Link
										to={
											typeof props.redirect === 'function'
												? `${props.redirect(pool.id)}`
												: `${props.redirect}${pool.id}`
										}
									>
										<S.ListItemWrapper>
											<S.LIHeaderContainer>
												<S.LIHeader1>{pool.state.title}</S.LIHeader1>
												<S.SubheaderFlex>
													<S.SubheaderContainer>
														<S.Subheader1>
															<p>{language.pool.subheader1}</p>
														</S.Subheader1>
														&nbsp;
														<S.ID>
															<p>{formatAddress(pool.id, false)}</p>
														</S.ID>
													</S.SubheaderContainer>
													&nbsp;
													<S.SubheaderContainer>
														<S.Subheader1>
															<p>{language.createdOn}</p>
														</S.Subheader1>
														&nbsp;
														<S.Date>
															<p>{formatDate(pool.state.timestamp, 'epoch')}</p>
														</S.Date>
													</S.SubheaderContainer>
												</S.SubheaderFlex>
											</S.LIHeaderContainer>
											<S.LIBodyContainer>
												<S.LIBodyFlex>
													<S.LIBodyHeader>{language.totalContributed}:</S.LIBodyHeader>
													&nbsp;
													<S.LIBodyData>{`${
														pool.totalContributed
															? pool.totalContributed
															: poolClient.getARAmount(pool.state.totalContributions)
													} ${language.arTokens}`}</S.LIBodyData>
												</S.LIBodyFlex>
												{pool.receivingPercent && (
													<S.LIBodyFlex>
														<S.LIBodyHeader>{language.receiving}:</S.LIBodyHeader>
														&nbsp;
														<S.LIBodyData>
															{pool.receivingPercent}% {language.artifactsCreated}
														</S.LIBodyData>
													</S.LIBodyFlex>
												)}
											</S.LIBodyContainer>
										</S.ListItemWrapper>
									</Link>
								</S.Link>
							);
						})}
					</>
				);
			}
		} else {
			return (
				<>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
						return (
							<S.LIP key={element}>
								<Loader placeholder />
							</S.LIP>
						);
					})}
				</>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.Header>
				<S.HeaderFlex>
					<S.H2>{props.header}</S.H2>
					{props.action && <S.Action>{props.action}</S.Action>}
				</S.HeaderFlex>
			</S.Header>
			<S.List>{getData()}</S.List>
		</S.Wrapper>
	);
}
