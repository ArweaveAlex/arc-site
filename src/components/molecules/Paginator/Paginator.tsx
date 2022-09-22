import { Button } from "@/components/atoms/Button";

import * as window from "@/window";
import { LANGUAGE } from "@/language";
import { IProps } from "./types"
import * as S from "./styles";

export default function Paginator(props: IProps) {
    let pageNumbers: number[] = [];
    for (let i = 0; i < props.nPages + 1; i++) {
        pageNumbers[i] = i;
    }
    pageNumbers = pageNumbers.slice(1);
    const pageLength = pageNumbers.length;

    function getSliceStart() {
        switch (true) {
            case props.currentPage === 1:
                return 0;
            case props.currentPage <= pageLength:
                return props.currentPage - 2;
            default:
                return 0;
        }
    }

    function getSliceEnd() {
        switch (true) {
            case props.currentPage === 1:
                return props.currentPage + 2;
            case props.currentPage <= pageLength:
                return props.currentPage + 1;
            default:
                return 0;
        }
    }

    const sliceStart = getSliceStart();
    const sliceEnd = getSliceEnd();

    function handleScroll() {
        if (props.scrollRef.current) {
            props.scrollRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }

    const handleNextPage = () => {
        if (props.currentPage !== props.nPages) {
            props.setCurrentPage(props.currentPage + 1);
            handleScroll();
        }
    }

    const handlePreviousPage = () => {
        if (props.currentPage !== 1) {
            props.setCurrentPage(props.currentPage - 1);
            handleScroll();
        }
    }

    const handleCurrentPage = (number: number) => {
        props.setCurrentPage(number);
        handleScroll();
    }

    return (
        <S.Wrapper>
            <Button
                label={LANGUAGE.previous}
                type={"secondary"}
                handlePress={handlePreviousPage}
                disabled={props.currentPage === 1}
                noMinWidth
            />
            <S.NumberContainer>
                {pageNumbers.slice(sliceStart, sliceEnd).map((number: number, index: number) => {
                    return (
                        <S.NumberButtonContainer key={index}>
                            <Button
                                label={number}
                                type={"primary"}
                                handlePress={() => handleCurrentPage(number)}
                                active={number === props.currentPage}
                                noMinWidth
                            />
                        </S.NumberButtonContainer>
                    )
                })}
                {!(props.currentPage >= pageLength - 1) &&
                    <>
                        {!(props.currentPage === pageLength - 2) && 
                            <S.Ellipses><span>...</span></S.Ellipses>
                        }
                        <S.NumberButtonContainer>
                            <Button
                                label={pageLength}
                                type={"primary"}
                                handlePress={() => handleCurrentPage(pageLength)}
                                active={pageLength === props.currentPage}
                                noMinWidth
                            />
                        </S.NumberButtonContainer>
                    </>
                }
                </S.NumberContainer>
            <Button
                label={LANGUAGE.next}
                type={"secondary"}
                handlePress={handleNextPage}
                disabled={props.currentPage === props.nPages}
                noMinWidth
            />
        </S.Wrapper>
    )
}