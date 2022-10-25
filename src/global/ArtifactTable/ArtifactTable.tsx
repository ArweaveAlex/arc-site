import React from "react";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language";
import { PAGINATOR } from "@/config";

import { AlignType, ArtifactTableRowType } from "@/types";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactTable(props: IProps) {
    function getHeader() {
        if (props.showBookmarks) {
            return ({
                title: { width: "70%", align: "left" as AlignType },
                dateCreated: { width: "20%", align: "left" as AlignType },
                bookmark: { width: "10%", align: "center" as AlignType }
            })
        }
        else {
            return ({
                title: { width: "75%", align: "left" as AlignType },
                dateCreated: { width: "25%", align: "left" as AlignType }
            })
        }
    }

    function getData() {
        if (props.showBookmarks) {
            return props.data;
        }
        else {
            return props.data.map((element: ArtifactTableRowType) => { 
                return { title: element.title, dateCreated: element.dateCreated }
            })
        }
    }

    return props.data.length > 0 ? (
        <Table
            title={LANGUAGE.artifacts}
            header={getHeader() as any}
            data={getData()}
            recordsPerPage={PAGINATOR}
        />
    ) :
        <S.EmptyWrapper>
            <p>{LANGUAGE.noArtifacts}</p>
        </S.EmptyWrapper>
}