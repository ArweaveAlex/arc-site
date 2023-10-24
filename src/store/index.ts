import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { accountReducer } from './account/reducers';
import { bookmarksReducer } from './artifacts/reducers';
import { cursorsReducer } from './cursors/reducers';
import { poolsReducer } from './pools/reducers';
import { searchIdsReducer, searchIndecesReducer, searchTermReducer } from './search/reducers';

declare const window: any;

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['cursorsReducer', 'searchIdsReducer', 'bookmarksReducer'],
};

const rootReducer = combineReducers({
	accountReducer,
	bookmarksReducer,
	cursorsReducer,
	poolsReducer,
	searchIdsReducer,
	searchTermReducer,
	searchIndecesReducer,
});

export type RootState = ReturnType<typeof store.getState>;
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

let composedEnhancer: any;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedEnhancer = compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	composedEnhancer = compose(applyMiddleware(thunk));
}

export type AppDispatch = typeof store.dispatch;
export const store = createStore(persistedReducer, composedEnhancer);
export const persistor = persistStore(store);
