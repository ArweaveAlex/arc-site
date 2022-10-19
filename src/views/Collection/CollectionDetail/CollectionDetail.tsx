import React from "react";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language";
import { PAGINATOR } from "@/config";

import * as S from "./styles";

export default function CollectionDetail(props: { artifactData: any }) {
    return props.artifactData.length > 0 ? (
        <Table
            title={LANGUAGE.artifacts}
            header={{
                title: { width: "73%" },
                dateCreated: { width: "17%" },
                id: {width: "11%"}
            }}
            data={props.artifactData}
            recordsPerPage={PAGINATOR}
        />
    ) : 
        <S.EmptyWrapper>
            <p>{LANGUAGE.noArtifactsCreated}</p>
        </S.EmptyWrapper>
}

