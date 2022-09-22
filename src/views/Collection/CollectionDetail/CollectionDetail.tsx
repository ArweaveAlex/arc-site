import React from "react";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"

import { MOCK_DATA_DETAIL } from "@/mock-data";

export default function CollectionDetail() {
    const data = MOCK_DATA_DETAIL;

    const header = {
        title: { width: "77.5%" },
        dateCreated: { width: "22.5%" }
    }

    return (
        <Table
            title={LANGUAGE.artefacts}
            header={header}
            data={data}
            recordsPerPage={50}
        />
    )
}