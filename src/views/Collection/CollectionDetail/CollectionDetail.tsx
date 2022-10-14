import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"

import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { artefactData: any }) {
    return (
        <Table
            title={LANGUAGE.artefacts}
            header={{
                title: { width: "77.5%" },
                dateCreated: { width: "22.5%" }
            }}
            data={props.artefactData}
            recordsPerPage={50}
        />
    );
}

