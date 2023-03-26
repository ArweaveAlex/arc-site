import React from 'react';
import { ReactSVG } from 'react-svg';

import { formatCount, formatDate, formatMetric } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactRedditSingle(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);
	const [data, setData] = React.useState<any>([]);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const finalData: any[] = [];
				await traverseCommentTree(['body'], jsonData, (obj: any) => finalData.push(obj));
				setData(sortCommentTree(finalData));
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jsonData]);

	function getTopPreview(preview: string) {
		return <S.HeaderBodyPreview image={preview} />;
	}

	function getTopPost() {
		if (jsonData && jsonData.length) {
			if (jsonData[0].data && jsonData[0].data.children && jsonData[0].data.children.length) {
				if (jsonData[0].data.children[0].data && jsonData[0].data.children[0].data.title) {
					const headerData: any = jsonData[0].data.children[0].data;

					let preview: string | null = null;
					let hasPreview: boolean = false;
					if (headerData.preview && headerData.preview.images && headerData.preview.images.length) {
						hasPreview = true;
					}
					if (hasPreview) {
						preview = headerData.preview.images[0].source.url;
					}

					return (
						<S.HeaderContent>
							<S.HeaderFlex>
								<S.HeaderSubReddit>{headerData.subreddit_name_prefixed}</S.HeaderSubReddit>
							</S.HeaderFlex>
							<S.HeaderInfo>
								<S.HeaderAD>
									<span>{headerData.subreddit_name_prefixed}&nbsp;·&nbsp;</span>
									{`${LANGUAGE.redditAuthor}${headerData.author}`} {formatDate(headerData.created_utc * 1000, 'iso')}
								</S.HeaderAD>
								<S.HeaderBody>
									<S.HeaderTitle width={hasPreview ? 70 : 100}>{headerData.title}</S.HeaderTitle>
									{hasPreview && getTopPreview(preview)}
								</S.HeaderBody>
								<S.PublicMetrics>
									<S.Metric>
										<ReactSVG src={ASSETS.replies} />
										<p>{`${formatCount(
											data ? formatMetric(data.join().split(',').length) : formatMetric(headerData.num_comments)
										)} ${LANGUAGE.comments}`}</p>
									</S.Metric>
									<S.Metric>
										<p>{`${Math.round(headerData.upvote_ratio * 100)}% ${LANGUAGE.upvoted}`}</p>
									</S.Metric>
								</S.PublicMetrics>
							</S.HeaderInfo>
						</S.HeaderContent>
					);
				}
			}
		}

		return null;
	}

	function getCommentTree() {
		if (data && data.length > 0) {
			return (
				<S.DetailWrapper>
					<S.DetailContent>
						{data.map((commentList: any, index: number) => {
							return (
								<S.CommentGroup key={index}>
									{commentList.map((element: any, commentIndex: number) => {
										return (
											<S.Comment key={commentIndex} depth={element.depth}>
												<S.CommentAuthor>
													<p>{element.author}&nbsp;·&nbsp;</p>
													<span> {formatDate(element.created_utc * 1000, 'iso')}</span>
												</S.CommentAuthor>
												<S.CommentBody>{element.body}</S.CommentBody>
											</S.Comment>
										);
									})}
								</S.CommentGroup>
							);
						})}
					</S.DetailContent>
				</S.DetailWrapper>
			);
		} else {
			return null;
		}
	}

	return data ? (
		<S.Wrapper>
			<S.ListWrapper>
				<S.HeaderWrapper>{getTopPost()}</S.HeaderWrapper>
				{getCommentTree()}
			</S.ListWrapper>
		</S.Wrapper>
	) : (
		<S.LoadingContainer>
			<Loader sm />
		</S.LoadingContainer>
	);
}

async function traverseCommentTree(callBackFields: string[], obj: any, callBack: any) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (callBackFields.includes(key)) {
				await callBack(obj);
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				await traverseCommentTree(callBackFields, obj[key], callBack);
			}
		}
	}
}

function sortCommentTree(data: any[]) {
	const reversedData = [...data].reverse();
	const bodyListData = reversedData.map((element) => element.body);
	let groupedData: any[] = [];
	const finalData: any[] = [];

	for (let i = 0; i < reversedData.length; i++) {
		if (reversedData[i].depth === 0) {
			let j = bodyListData.indexOf(reversedData[i].body);
			let commentTraversed = false;
			const subList: any[] = [];
			subList.push(reversedData[j]);
			j++;
			while (!commentTraversed) {
				if (reversedData[j]) {
					if (reversedData[j].depth === 0) {
						commentTraversed = true;
					} else {
						subList.push(reversedData[j]);
					}
					j++;
				} else {
					commentTraversed = true;
				}
			}
			groupedData.push(subList);
		}
	}
	groupedData = groupedData.reverse();
	for (let i = 0; i < groupedData.length; i++) {
		finalData.push(groupedData[i]);
	}
	return finalData;
}
