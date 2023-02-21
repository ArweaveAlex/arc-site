import { Routes, Route } from "react-router-dom";

import { View } from "wrappers/View";

import { Landing } from "views/Landing";
import { Pool } from "views/Pool";
import { Pools } from "views/Pools";
import { Artifact } from "views/Artifact";
import { ArtifactThread } from "views/Artifact/ArtifactThread";
import { Account } from "views/Account";
import { Library } from "views/Library";
import { CollectionsCreate } from "views/Collections/CollectionsCreate";
import { NotFound } from "views/NotFound";

import * as urls from "helpers/urls";

export default function _Routes() {
  return (
    <Routes>
      <Route
        path={urls.base}
        element={
          <View>
            <Landing />
          </View>
        }
      />
      <Route
        path={`${urls.pool}:id`}
        element={
          <View>
            <Pool />
          </View>
        }
      />
      <Route
        path={urls.pools}
        element={
          <View>
            <Pools />
          </View>
        }
      />
      <Route
        path={`${urls.library}:id/:active`}
        element={
          <View>
            <Library />
          </View>
        }
      />
      <Route
        path={`${urls.artifact}:id`}
        element={
          <View>
            <Artifact />
          </View>
        }
      />
      <Route
        path={`${urls.thread}:associationId/:id`}
        element={
          <View>
            <ArtifactThread />
          </View>
        }
      />
      <Route
        path={`${urls.account}:active`}
        element={
          <View>
            <Account />
          </View>
        }
      />
      <Route
        path={urls.collectionsCreate}
        element={
          <View>
            <CollectionsCreate />
          </View>
        }
      />
      <Route
        path={"*"}
        element={
          <View>
            <NotFound />
          </View>
        }
      />
    </Routes>
  );
}
