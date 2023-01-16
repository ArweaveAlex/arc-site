import React from "react";
import { useParams } from "react-router-dom";

import { getArtifactsByAssociation } from "gql/artifacts";
import { SequenceType } from "helpers/types";
import { ArtifactList } from "../ArtifactList";

import * as window from "helpers/window";
import { AssociationDetailType } from "helpers/types";

export default function Artifact() {
    const { associationId } = useParams();

    const [data, setData] = React.useState<AssociationDetailType | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [sequence, setSequence] = React.useState<SequenceType>({ start: 0, end: 9 });

    function updateSequence() {
        setSequence({ start: sequence.start + 10, end: sequence.end + 10 });
    }

    React.useEffect(() => {
        (async function () {
            if (associationId) {
                if (!data) {
                    window.scrollTo(0, 0);
                    setLoading(true);
                    setData((await getArtifactsByAssociation(associationId, sequence)));
                    setLoading(false);
                }
                else {
                    setLoading(true);
                    const associationDetail = await getArtifactsByAssociation(associationId, sequence);
                    setData({
                        artifacts: [...data.artifacts, ...associationDetail.artifacts],
                        length: associationDetail.length
                    });
                    setLoading(false);
                }
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [associationId, sequence]);

    return (
        <ArtifactList
            data={data ? data.artifacts : null}
            loading={loading}
            updateSequence={updateSequence}
        />
    )
}
