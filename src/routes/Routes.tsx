import { Routes, Route } from "react-router-dom";

import { View } from "wrappers/View";

import { Landing } from "views/Landing";
import { Collection } from "views/Collection";
import { Collections } from "views/Collections";
import { Artifact } from "views/Artifact";
import { Account } from "views/Account";
import { Library } from "views/Library";
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
      <Route path={urls.collections} element={
        <View>
          <Collections />
        </View>
      } />
      <Route path={`${urls.library}:id/:active`} element={
        <View>
          <Library />
        </View>
      } />
      <Route path={`${urls.artifact}:id`} element={
        <View>
          <Artifact />
        </View>
      } />
      <Route path={`${urls.account}:active`} element={
        <View>
          <Account />
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