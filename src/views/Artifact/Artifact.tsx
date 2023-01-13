import React from "react";
import { useParams } from "react-router-dom";

import { getArtifactsByAssociation } from "gql/artifacts";

import { ArtifactList } from "./ArtifactList";
import { ArtifactSingle } from "./ArtifactSingle";

import { Loader } from "components/atoms/Loader";

import * as window from "helpers/window";
import { ArtifactDetailType } from "helpers/types";

export default function Artifact() {
    const { id } = useParams();

    const [data, setData] = React.useState<ArtifactDetailType | ArtifactDetailType[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (id) {
                window.scrollTo(0, 0);
                setLoading(true);
                await getArtifactsByAssociation(id, (data: ArtifactDetailType | ArtifactDetailType[]) => { setData(data) })
                setLoading(false);
            }
        })()
    }, [id]);

    function getData() {
        if ((data instanceof Array) && data.length > 0 && data[0] === null) {
            return null;
        }
        else if ((data instanceof Array) && data.length > 0) {
            return (
                <ArtifactList 
                    data={data}
                    loading={loading}
                />
            )
        }
        else {
            return <ArtifactSingle data={data as ArtifactDetailType} />
        }
    }

    return data ? <>{getData()}</> : <Loader />;
}
