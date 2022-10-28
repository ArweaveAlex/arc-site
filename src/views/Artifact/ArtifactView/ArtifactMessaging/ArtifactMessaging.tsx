import React from "react";
import parse from "html-react-parser";

import { LANGUAGE } from "@/language";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactMessaging(props: IProps) {
    const [data, setData] = React.useState<any>(null);
    
    React.useEffect(() => {
        setData(JSON.parse(props.data.rawData));
    }, [props.data])

    return data ? (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.BorderSection>
                        <S.InfoData>
                            <span>
                                {LANGUAGE.messaging.name}
                            </span>
                            <p>
                                {data.user.name}
                            </p>
                        </S.InfoData>
                    </S.BorderSection>
                    <S.Section>
                        <S.InfoData>
                            <span>
                                {LANGUAGE.messaging.handle}
                            </span>
                            <p>
                                {`@${data.user.screen_name}`}
                            </p>
                        </S.InfoData>
                    </S.Section>
                </S.Header>
                <S.Body>
                    <S.Message>
                        <span>
                            {LANGUAGE.messaging.message}
                        </span>
                        <p>
                            {data.text}
                        </p>
                    </S.Message>
                </S.Body>
                <S.Footer>
                    <S.BorderSection>
                        <S.InfoData>
                            <span>
                                {LANGUAGE.messaging.originalPostDate}
                            </span>
                            <p>
                                {data.created_at}
                            </p>
                        </S.InfoData>
                    </S.BorderSection>
                    <S.Section>
                        <S.InfoData>
                            <span>
                                {LANGUAGE.messaging.source}
                            </span>
                            <p>
                                {parse(data.source)}
                            </p>
                        </S.InfoData>
                    </S.Section>
                </S.Footer>
            </S.Content>
        </S.Wrapper>
    ) : null;
}