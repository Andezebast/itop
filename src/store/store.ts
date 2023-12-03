import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {сurrenciesSaga} from "./currenciesSlice";
import createSagaMiddleware from 'redux-saga';
import courseSlice from './currenciesSlice';

const rootReducer = combineReducers({
    courseSlice,
})

const sagaMiddleware = createSagaMiddleware()

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware)
    })
}

const store = setupStore();

sagaMiddleware.run(сurrenciesSaga)


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];

export default store;