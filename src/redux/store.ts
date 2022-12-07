import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import { bookmarksReducer } from "./artifacts/reducers";
import { cursorsReducer } from "./cursors/reducers";
import { poolsReducer } from "./pools/reducers";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['cursorsReducer']
};

const rootReducer = combineReducers({
    bookmarksReducer,
    cursorsReducer,
    poolsReducer
});

export type RootState = ReturnType<typeof store.getState>;
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const logger = createLogger();

export type AppDispatch = typeof store.dispatch;
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, logger)
);
export const persistor = persistStore(store);
