import React from "react";

import { Paginator } from "components/molecules/Paginator";

import { KeyValueType } from "types";

import { formatTitle } from "utils";
import { IProps } from "./types";
import * as S from "./styles";

export default function Table(props: IProps) {
    const scrollRef = React.useRef(null);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [recordsPerPage] = React.useState(props.recordsPerPage);

    const lastRecordIndex = currentPage * recordsPerPage;
    const firstRecordIndex = lastRecordIndex - recordsPerPage;
    const currentRecords = props.data.slice(firstRecordIndex, lastRecordIndex);
    const nPages = Math.ceil(props.data.length / recordsPerPage);

    return (
        <S.Wrapper ref={scrollRef}>
            <S.Header>
                <S.HeaderFlex>
                    <S.H2>{props.title}</S.H2>
                    {
                        props.titleAction &&
                        <>{props.titleAction}</>
                    }
                </S.HeaderFlex>
            </S.Header>
            <S.Body>
                <S.Table>
                    <S.TableHeader>
                        {Object.keys(props.header).map((element: string, index: number) => {
                            return (
                                <S.THeader key={index} even={(index + 1) % 2 === 0} width={props.header[element]!.width} align={props.header[element]!.align}>
                                    <p>{formatTitle(element)}</p>
                                </S.THeader>
                            )
                        })}
                    </S.TableHeader>
                    {currentRecords.map((element: KeyValueType, index: number) => {
                        return (
                            <S.Row key={index} even={index % 2 === 0}>
                                {Object.keys(element).map((row: string, rowIndex: number) => {
                                    const rowData = typeof element[row] === "object" ? element[row] : <p>{element[row]}</p>
                                    return (
                                        <S.TData
                                            key={rowIndex}
                                            even={(rowIndex + 1) % 2 === 0}
                                            width={props.header[row]!.width}
                                        >
                                            {rowData}
                                        </S.TData>
                                    )
                                })}
                            </S.Row>
                        )
                    })}
                </S.Table>
            </S.Body>
            <Paginator
                scrollRef={scrollRef}
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                showPageNumbers={props.showPageNumbers}
                handleUpdateFetch={(cursor: string | null) => props.handleUpdateFetch(cursor)}
                cursors={props.cursors}
            />
        </S.Wrapper>
    )
}