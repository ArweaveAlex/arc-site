import React from "react";
import Router, { useRouter } from "next/router";

import { Button } from "@/components/atoms/Button";

import { _404 } from "@/views/404"

import * as S from "./styles";
import { ITProps, ICProps, IUProps } from "./types";

function Tab(props: ITProps) {
  function handlePress() {
    props.handlePress(props.url);
  }

  return (
    <S.Tab>
      <Button
        type={"tertiary"}
        label={props.label}
        handlePress={handlePress}
        active={props.active}
        icon={`/assets/${props.icon}`}
        iconLeftAlign
        // noMinWidth
      />
    </S.Tab>
  );
}

function TabContent(props: ICProps) {
  const router = useRouter();
  const activeUrl = router.pathname;

  let TabView: React.ComponentType = _404;
  for (let i = 0; i < props.tabs.length; i++) {
    if (props.tabs[i]) {
      if (props.tabs[i]!.url.includes(activeUrl)) {
        TabView = props.tabs[i]!.view!;
      }
    }
  }
  return (
    <S.View>
      <TabView />
    </S.View>
  );
}

export default function URLTabs(props: IUProps) {
  const router = useRouter();
  const activeUrl = router.pathname;

  const handleRedirect = (url: string) => {
    if (activeUrl !== url) {
      Router.push(url);
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
                active={elem.url.includes(activeUrl)}
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
