import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import * as urls from 'helpers/urls';
import Storage from 'views/Storage';
import Trade from 'views/Trade';
import { View } from 'wrappers/View';

const About = getLazyImport('About');
const Account = getLazyImport('Account');
const Artifact = getLazyImport('Artifact');
const ArtifactThread = getLazyImport('Artifact/ArtifactThread');
const CollectionsManage = getLazyImport('Collections/CollectionsManage');
const Contribute = getLazyImport('Contribute');
const Create = getLazyImport('Create');
const Docs = getLazyImport('Docs');
const Landing = getLazyImport('Landing');
const Library = getLazyImport('Library');
const NotFound = getLazyImport('NotFound');
const Pool = getLazyImport('Pool');
const PoolManage = getLazyImport('Pool/PoolManage');
const Pools = getLazyImport('Pools');
const PoolsCreate = getLazyImport('Pools/PoolsCreate');

export default function _Routes() {
	return (
		<Suspense fallback={<Loader />}>
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
					path={`${urls.poolManage}:id/:active`}
					element={
						<View>
							<PoolManage />
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
					path={urls.poolsCreate}
					element={
						<View>
							<PoolsCreate />
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
					path={urls.collectionsManage}
					element={
						<View>
							<CollectionsManage />
						</View>
					}
				/>
				<Route
					path={urls.about}
					element={
						<View>
							<About />
						</View>
					}
				/>
				<Route
					path={urls.contribute}
					element={
						<View>
							<Contribute />
						</View>
					}
				/>
				<Route
					path={urls.create}
					element={
						<View>
							<Create />
						</View>
					}
				/>
				<Route
					path={`${urls.docs}:active/*`}
					element={
						<View>
							<Docs />
						</View>
					}
				/>
				<Route
					path={urls.docs}
					element={
						<View>
							<Docs />
						</View>
					}
				/>
				<Route
					path={'*'}
					element={
						<View>
							<NotFound />
						</View>
					}
				/>
				<Route
					path={urls.storage}
					element={
						<View>
							<Storage />
						</View>
					}
				/>
				<Route
					path={urls.trade}
					element={
						<View>
							<Trade />
						</View>
					}
				/>
			</Routes>
		</Suspense>
	);
}

function getLazyImport(view: string) {
	return lazy(() => import(`views/${view}`).then((module) => ({ default: module.default })));
}
