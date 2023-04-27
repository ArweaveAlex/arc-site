import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import * as urls from 'helpers/urls';
import { View } from 'wrappers/View';

const About = getLazyImport('About');
const Account = getLazyImport('Account');
const Artifact = getLazyImport('Artifact');
const ArtifactThread = getLazyImport('Artifact/ArtifactThread');
const CollectionsManage = getLazyImport('Collections/CollectionsManage');
const Contribute = getLazyImport('Contribute');
const Create = getLazyImport('Create');
const Landing = getLazyImport('Landing');
const Library = getLazyImport('Library');
const NotFound = getLazyImport('NotFound');
const Pool = getLazyImport('Pool');
const Pools = getLazyImport('Pools');

// TODO: layout library account artifact artifact-thread
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
					path={'*'}
					element={
						<View>
							<NotFound />
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
