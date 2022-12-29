import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import { collectionsReducer } from "./artifacts/reducers";
import { cursorsReducer } from "./cursors/reducers";
import { poolsReducer } from "./pools/reducers";
import { searchIdsReducer } from "./search/reducers";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [
        "cursorsReducer", 
        "searchIdsReducer"
    ]
};

const rootReducer = combineReducers({
    collectionsReducer,
    cursorsReducer,
    poolsReducer,
    searchIdsReducer
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
