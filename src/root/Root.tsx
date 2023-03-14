import { APP, DOM } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { Header } from 'navigation/header';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { Routes } from 'routes';

export default function Root() {
	if (!localStorage.getItem(APP.key) || localStorage.getItem(APP.key) !== APP.version) {
		localStorage.clear();
		localStorage.setItem(APP.key, APP.version);
		window.location.reload();
	}

	return (
		<ArweaveProvider>
			<div id={DOM.loader} />
			<div id={DOM.modal} />
			<div id={DOM.notification} />
			<Header />
			<Routes />
			<Footer />
		</ArweaveProvider>
	);
}
