import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import { collectionsReducer } from "./artifacts/reducers";
import { cursorsReducer } from "./cursors/reducers";
import { poolsReducer } from "./pools/reducers";
import { 
    searchIdsReducer, 
    searchTermReducer,
    searchIndecesReducer
} from "./search/reducers";

declare const window: any;

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
    searchIdsReducer,
    searchTermReducer,
    searchIndecesReducer
});

export type RootState = ReturnType<typeof store.getState>;
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

let composedEnhancer: any;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}
else {
    composedEnhancer = compose(applyMiddleware(thunk))
}

export type AppDispatch = typeof store.dispatch;
export const store = createStore(
    persistedReducer,
    composedEnhancer
);
export const persistor = persistStore(store);
