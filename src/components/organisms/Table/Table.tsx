import React from "react";

import { Paginator } from "@/components/molecules/Paginator";

import * as util from "@/util";
import * as S from "./styles";
import { IProps } from "./types";
import { KeyValueStringType } from "@/types";

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
                </S.HeaderFlex>
            </S.Header>
            <S.Body>
                <S.Table>
                    <S.TableHeader>
                        {Object.keys(props.header).map((element: string, index: number) => {
                            return (
                                <S.THeader key={index} width={props.header[element]!.width}>{util.formatTitle(element)}</S.THeader>
                            )
                        })}
                    </S.TableHeader>
                    {currentRecords.map((element: KeyValueStringType, index: number) => {
                        return (
                            <S.Row key={index} even={index % 2 === 0}>
                                {Object.keys(element).map((row: string, rowIndex: number) => {
                                    return (
                                        <S.TData key={rowIndex} width={props.header[row]!.width}><p>{element[row]}</p></S.TData>
                                    )
                                })}
                            </S.Row>
                        )
                    })}
                </S.Table>
                <Paginator
                    scrollRef={scrollRef}
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </S.Body>
        </S.Wrapper>
    )
}