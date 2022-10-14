import React from "react";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"
import * as S from "./styles";

import { useARProvder } from "@/providers/ARProvider";
import { formatDate, getTagValue } from "@/util";

export default function AccountAll() {
    const [data, setData] = React.useState<any>(null);
    const arProvider = useARProvder();

    const header = {
        title: { width: "77.5%" },
        dateCreated: { width: "22.5%" }
    }

    React.useEffect(() => {
        if(arProvider.walletAddress){
            (async function () {
                setData((await arProvider.getUserArtefacts(arProvider.walletAddress!)).map((element: any) => {
                    return { title: getTagValue(element.node.tags, "Artefact-Name"), dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "ts") }
                }));
            })();
        }
    }, [arProvider.walletAddress])

    return data ? (
        <S.Wrapper>
            <Table
                title={LANGUAGE.allArtefacts}
                header={header}
                data={data}
                recordsPerPage={50}
            />
        </S.Wrapper>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}