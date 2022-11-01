import { Routes, Route } from "react-router-dom";

import { View } from "wrappers/View";

import { Landing } from "views/Landing";
import { Collection } from "views/Collection";
import { Artifact } from "views/Artifact";
import { AccountTabs } from "views/Account/AccountTabs";
import { NotFound } from "views/NotFound";

import * as urls from "urls";

export default function _Routes() {
  return (
    <Routes>
      <Route path={urls.base} element={
        <View>
          <Landing />
        </View>
      } />
      <Route path={`${urls.collection}:id`} element={
        <View>
          <Collection />
        </View>
      } />
      <Route path={`${urls.artifact}:id`} element={
        <View>
          <Artifact />
        </View>
      } />
      <Route path={`${urls.account}:active`} element={
        <View>
          <AccountTabs />
        </View>
      } />
      <Route path={"*"} element={
        <View>
          <NotFound />
        </View>
      } />
    </Routes>
  );
}