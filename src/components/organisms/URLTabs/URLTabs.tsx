import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components/atoms/Button";

import { NotFound } from "views/NotFound";

import * as S from "./styles";
import { ASSET_SRC } from "config";
import { ITProps, ICProps, IUProps } from "./types";

function Tab(props: ITProps) {
    function handlePress(e: any) {
      e.preventDefault();
      props.handlePress(props.url);
    }

    return (
      <S.Tab>
        <Button
          type={"tertiary"}
          label={props.label}
          handlePress={handlePress}
          active={props.active}
          icon={`${ASSET_SRC}/${props.icon}`}
          iconLeftAlign
          disabled={props.disabled}
        />
      </S.Tab>
    );
}

function TabContent(props: ICProps) {
  const { active } = useParams() as { active: string };
  let TabView: React.ComponentType = NotFound;
  for (let i = 0; i < props.tabs.length; i++) {
    if (props.tabs[i].url.includes(active)) {
      TabView = props.tabs[i].view;
    }
  }
  return (
    <S.View>
      <TabView />
    </S.View>
  );
}
export default function URLTabs(props: IUProps) {
  const navigate = useNavigate();
  const { active } = useParams() as { active: string };

  React.useEffect(() => {
    if (!active) {
      navigate(props.activeUrl);
    }
  }, [active, navigate, props.activeUrl]);

  const handleRedirect = (url: string) => {
    if (active !== url) {
      navigate(url);
    }
  };

  return (
    <S.Wrapper>
      <S.ListHeader>
        <S.List>
          {props.tabs.map((elem, index) => {
            return (
              <Tab
                key={index}
                url={elem.url}
                label={elem.label}
                icon={elem.icon}
                disabled={elem.disabled}
                active={elem.url.includes(active)}
                handlePress={() => handleRedirect(elem.url)}
              />
            );
          })}
        </S.List>
      </S.ListHeader>
      <S.Content>
        <TabContent tabs={props.tabs} />
      </S.Content>
    </S.Wrapper>
  );
}