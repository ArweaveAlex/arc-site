import React from "react";

import { Paginator } from "@/components/molecules/Paginator";

import * as util from "@/util";
import * as S from "./styles";
import { IProps } from "./types";
import { KeyValueType } from "@/types";

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
                                <S.THeader key={index} even={(index + 1) % 2 === 0} width={props.header[element]!.width}>
                                    {
                                         element !== 'id' &&
                                         <p>{util.formatTitle(element)}</p>
                                    }
                                    {
                                         element === 'id' &&
                                         <p>{"My Library"}</p>
                                    }
                                </S.THeader>
                            )
                        })}
                    </S.TableHeader>
                    {currentRecords.map((element: KeyValueType, index: number) => {
                        return (
                            <S.Row key={index} even={index % 2 === 0}>
                                {Object.keys(element).map((row: string, rowIndex: number) => {
                                    return (
                                        <S.TData 
                                            key={rowIndex} 
                                            even={(rowIndex + 1) % 2 === 0} 
                                            width={props.header[row]!.width}>
                                                { row !== 'id' &&
                                                    <p>{element[row]}</p>
                                                }
                                                
                                                {
                                                    props.toggleUserFavorite && row === 'id' && 
                                                        <button onClick={
                                                            () => {props.toggleUserFavorite!(element[row]!.toString())
                                                        }}>Add to My Library</button>
                                                }
                                                
                                        </S.TData>
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