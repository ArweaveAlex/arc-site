import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language";
import { PAGINATOR } from "@/config";

import * as S from "./styles";

export default function CollectionDetail(props: { artifactData: any }) {
    const arProvider = useARProvder();

    return props.artifactData.length > 0 ? (
        <Table
            title={LANGUAGE.artifacts}
            header={{
                title: { width: "73%" },
                dateCreated: { width: "17%" },
                id: {width: "11%"}
            }}
            toggleUserFavorite={arProvider.toggleUserFavorite}
            data={props.artifactData}
            recordsPerPage={PAGINATOR}
        />
    ) : 
        <S.EmptyWrapper>
            <p>{LANGUAGE.noArtifacts}</p>
        </S.EmptyWrapper>
}

