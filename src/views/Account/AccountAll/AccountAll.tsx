import React from "react";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"
import * as S from "./styles";

import { MOCK_DATA_DETAIL } from "@/mock-data";

export default function AccountAll() {
    const data = MOCK_DATA_DETAIL;

    const header = {
        title: { width: "77.5%" },
        dateCreated: { width: "22.5%" }
    }

    return (
        <S.Wrapper>
            <Table
                title={LANGUAGE.allArtefacts}
                header={header}
                data={data}
                recordsPerPage={50}
            />
        </S.Wrapper>
    )
}