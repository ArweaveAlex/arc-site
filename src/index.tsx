import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from 'app';

import { Loader } from 'components/atoms/Loader';

import { GlobalStyle } from 'app/styles';
import { defaultTheme } from 'helpers/themes';

import { store, persistor } from 'state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

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
