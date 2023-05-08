import React from 'react';

import { PAGINATOR } from 'arcframework';

import { Placeholder } from 'components/atoms/Placeholder';
import { Paginator } from 'components/molecules/Paginator';
import { language } from 'helpers/language';
import { TableRowType } from 'helpers/types';

import * as S from './styles';
import { IProps } from './types';

export default function Table(props: IProps) {
	const scrollRef = React.useRef(null);

	const [currentPage, setCurrentPage] = React.useState(1);
	const [recordsPerPage] = React.useState(props.recordsPerPage);

	const lastRecordIndex = currentPage * recordsPerPage;
	const firstRecordIndex = lastRecordIndex - recordsPerPage;
	const currentRecords = props.data ? props.data.slice(firstRecordIndex, lastRecordIndex) : null;
	const nPages = props.data ? Math.ceil(props.data.length / recordsPerPage) : null;

	function getTable() {
		if (!currentRecords) {
			return <Placeholder rowCount={PAGINATOR} />;
		} else {
			if (currentRecords.length <= 0) {
				if (props.showNoResults) {
					return (
						<S.Body>
							<S.NoArtifactsContainer>
								<p>{language.noArtifacts}</p>
							</S.NoArtifactsContainer>
						</S.Body>
					);
				} else {
					return null;
				}
			} else if (currentRecords.length > 0) {
				return (
					<S.Body>
						<S.Table>
							<S.TableHeader>
								{Object.keys(props.header).map((element: string, index: number) => {
									return (
										<S.THeader
											key={index}
											even={(index + 1) % 2 === 0}
											width={props.header[element]!.width}
											align={props.header[element]!.align}
										>
											<p>{props.header[element].display ? props.header[element].display : ''}</p>
										</S.THeader>
									);
								})}
							</S.TableHeader>
							{currentRecords.map((element: TableRowType, index: number) => {
								return (
									<S.Row key={index} active={element.active} viewed={element.viewed}>
										{Object.keys(element.data).map((row: string, rowIndex: number) => {
											const rowData =
												typeof element.data[row] === 'object' ? element.data[row] : <p>{element.data[row]}</p>;
											return (
												<S.TData
													key={rowIndex}
													even={(rowIndex + 1) % 2 === 0}
													width={props.header[row]!.width}
													active={false}
												>
													{rowData}
												</S.TData>
											);
										})}
									</S.Row>
								);
							})}
						</S.Table>
					</S.Body>
				);
			} else {
				if (props.showNoResults) {
					return (
						<S.Body>
							<S.NoArtifactsContainer>
								<p>{language.noArtifacts}</p>
							</S.NoArtifactsContainer>
						</S.Body>
					);
				}
			}
		}
	}

	function getPaginator(useIcons: boolean) {
		if (currentRecords) {
			if (currentRecords.length <= 0) {
				return null;
			} else {
				return (
					<Paginator
						scrollRef={scrollRef}
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						showPageNumbers={props.showPageNumbers}
						handleCursorFetch={(cursor: string | null) => props.handleCursorFetch(cursor)}
						cursors={props.cursors}
						useIcons={useIcons}
					/>
				);
			}
		}
	}

	return (
		<S.Wrapper ref={scrollRef}>
			<S.Header>
				<S.HeaderFlex>
					<S.H2>{props.title}</S.H2>
					{props.action && <>{props.action}</>}
				</S.HeaderFlex>
			</S.Header>
			{getPaginator(true)}
			{getTable()}
			{getPaginator(false)}
		</S.Wrapper>
	);
}
