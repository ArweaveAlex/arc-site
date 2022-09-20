import React from "react";

import { Paginator } from "@/components/molecules/Paginator";

import { language } from "@/language"
import * as S from "./styles";

import { MOCK_DATA_DETAIL } from "@/mock-data";

export default function CollectionDetail() {
    const data = MOCK_DATA_DETAIL;
    const scrollRef = React.useRef(null);
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const [recordsPerPage] = React.useState(50);

    const lastRecordIndex = currentPage * recordsPerPage;
    const firstRecordIndex = lastRecordIndex - recordsPerPage;
    const currentRecords = data.slice(firstRecordIndex, lastRecordIndex);
    const nPages = Math.ceil(data.length / recordsPerPage);

    return (
        <S.Wrapper ref={scrollRef}>
            <S.Header>
                <S.HeaderFlex>
                    <S.H2>{language.artefacts}</S.H2>
                </S.HeaderFlex>
            </S.Header>
            <S.Body>
                <S.Table>
                    <S.TableHeader>
                        <S.THeader><p>{language.collection.detail.title}</p></S.THeader>
                        <S.DCHeader><p>{language.collection.detail.dateCreated}</p></S.DCHeader>
                    </S.TableHeader>
                    {currentRecords.map((element: any, index: number) => (
                        <S.Row key={index} even={index % 2 === 0}>
                            <S.TData><p>{element.title}</p></S.TData>
                            <S.DCData><p>{element.dateCreated}</p></S.DCData>
                        </S.Row>
                    ))}
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