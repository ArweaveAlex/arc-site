import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { Loader } from 'components/atoms/Loader';
import { defaultTheme } from 'helpers/themes';
import { persistor, store } from 'state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker
// 			.register('/service-worker.js')
// 	});
// }

root.render(
	<Provider store={store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			<ThemeProvider theme={defaultTheme}>
				<React.StrictMode>
					<HashRouter>
						<GlobalStyle />
						<App />
					</HashRouter>
				</React.StrictMode>
			</ThemeProvider>
		</PersistGate>
	</Provider>
);
