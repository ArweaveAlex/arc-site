import { Link } from 'react-router-dom';

import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';
import { formatAddress, formatDate } from 'helpers/utils';

import * as S from './styles';

export default function ContributionsList({ data }: any) {
	return (
		<S.Wrapper>
			<S.Header>
				<S.HeaderFlex>
					<S.H2>{LANGUAGE.contributions}</S.H2>
				</S.HeaderFlex>
			</S.Header>
			<S.List>
				{data.map((pool: any, index: number) => {
					return (
						<S.Link key={index}>
							<Link to={`${urls.pool}${pool.id}`}>
								<S.ListItemWrapper>
									<S.LIHeaderContainer>
										<S.LIHeader1>{pool.state.title}</S.LIHeader1>
										<S.SubheaderFlex>
											<S.SubheaderContainer>
												<S.Subheader1>
													<p>{LANGUAGE.pool.subheader1}</p>
												</S.Subheader1>
												&nbsp;
												<S.ID>
													<p>{formatAddress(pool.id, false)}</p>
												</S.ID>
											</S.SubheaderContainer>
											&nbsp;
											<S.SubheaderContainer>
												<S.Subheader1>
													<p>{LANGUAGE.createdOn}</p>
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
											<S.LIBodyHeader>{LANGUAGE.totalContributed}:</S.LIBodyHeader>
											&nbsp;
											<S.LIBodyData>{`${pool.totalContributed} ${LANGUAGE.arTokens}`}</S.LIBodyData>
										</S.LIBodyFlex>
										{/* <S.LIBodyFlex>
                                            <S.LIBodyHeader>{LANGUAGE.lastContribution}:</S.LIBodyHeader>
                                            &nbsp;
                                            <S.LIBodyData>{formatDate(pool.lastContribution, "epoch")}</S.LIBodyData>
                                        </S.LIBodyFlex> */}
										<S.LIBodyFlex>
											<S.LIBodyHeader>{LANGUAGE.receiving}:</S.LIBodyHeader>
											&nbsp;
											<S.LIBodyData>
												{pool.receivingPercent}% {LANGUAGE.artifactsCreated}
											</S.LIBodyData>
										</S.LIBodyFlex>
									</S.LIBodyContainer>
								</S.ListItemWrapper>
							</Link>
						</S.Link>
					);
				})}
			</S.List>
		</S.Wrapper>
	);
}
