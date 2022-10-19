import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"

import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { artefactData: any }) {

    const arProvider = useARProvder();

    return (
        <Table
            title={LANGUAGE.artefacts}
            header={{
                title: { width: "73%" },
                dateCreated: { width: "17%" },
                id: {width: "11%"}
            }}
            data={props.artefactData}
            recordsPerPage={50}
            toggleUserFavorite={arProvider.toggleUserFavorite}
        />
    );
}

