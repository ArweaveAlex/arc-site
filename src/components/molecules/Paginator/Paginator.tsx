import { Button } from "@/components/atoms/Button";

import { language } from "@/language";
import { IProps } from "./types"
import * as S from "./styles";

export default function Paginator(props: IProps) {
    let pageNumbers: number[] = [];
    for (let i = 0; i < props.pages + 1; i++) {
        pageNumbers[i] = i;
    }
    pageNumbers = pageNumbers.slice(1);
    const pageLength = pageNumbers.length - 1;

    const sliceStart = props.currentPage >= (pageLength - 2) ? props.currentPage - 2 : props.currentPage - 1;
    const sliceEnd = props.currentPage >= (pageLength - 1) ? pageLength : props.currentPage + 2;

    const mapNumbers = pageNumbers.slice(sliceStart, sliceEnd);

    const handleNextPage = () => {
        if (props.currentPage !== props.pages) props.setCurrentPage(props.currentPage + 1)
    }

    const handlePreviousPage = () => {
        if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1)
    }

    return (
        <S.Wrapper>
            <Button
                label={language.previous}
                type={"secondary"}
                handlePress={handlePreviousPage}
                noMinWidth
            />
            <S.NumberContainer>
                {mapNumbers.map((number: number, index: number) => {
                    return (
                        <S.NumberButtonContainer key={index}>
                            <Button
                                label={number}
                                type={"primary"}
                                handlePress={() => props.setCurrentPage(number)}
                                active={number === props.currentPage}
                                noMinWidth
                            />
                        </S.NumberButtonContainer>
                    )
                })}
                {!(props.currentPage >= pageLength - 2) &&
                    <>
                        {!(props.currentPage === pageLength - 3) && 
                            <S.Ellipses><span>...</span></S.Ellipses>
                        }
                        <S.NumberButtonContainer>
                            <Button
                                label={pageLength}
                                type={"primary"}
                                handlePress={() => props.setCurrentPage(pageLength)}
                                active={pageLength === props.currentPage}
                                noMinWidth
                            />
                        </S.NumberButtonContainer>
                    </>
                }
                </S.NumberContainer>
            <Button
                label={language.next}
                type={"secondary"}
                handlePress={handleNextPage}
                noMinWidth
            />
        </S.Wrapper>
    )
}