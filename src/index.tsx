import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { Loader } from 'components/atoms/Loader';
import { defaultTheme } from 'helpers/themes';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { MintProvider } from 'providers/MintProvider';
import { OrderBookProvider } from 'providers/OrderBookProvider';
import { persistor, store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			<ThemeProvider theme={defaultTheme}>
				<ArweaveProvider>
					<OrderBookProvider>
						<MintProvider>
							<HashRouter>
								<GlobalStyle />
								<App />
							</HashRouter>
						</MintProvider>
					</OrderBookProvider>
				</ArweaveProvider>
			</ThemeProvider>
		</PersistGate>
	</Provider>
);
