import axios, {AxiosResponse} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICurrencies } from "../models/ICurrencies";
import { all, call, takeLatest, put} from 'redux-saga/effects';

interface ICurrenciesState{
    сurrencies: ICurrencies[],
}

const initialState: ICurrenciesState = {
    сurrencies: []
}

export const сurrenciesSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchСurrencies(){},
        getСurrencies(state, action: PayloadAction<ICurrencies[]>){
            state.сurrencies = action.payload;
            console.log(action.payload, 'action.payload')
        }
    }
})

export const {fetchСurrencies, getСurrencies} = сurrenciesSlice.actions;

export default сurrenciesSlice.reducer;
/*------------------------------------------------*/
function* fetchCurrencies(){
    try{
        let response: AxiosResponse<ICurrencies[]> = yield call(axios.get, 'https://656ca5bae1e03bfd572e97e7.mockapi.io/currencies');
        if(response.data){
            yield put(getСurrencies(response.data))
        }
    }catch(e){
        console.log(e)
    }
}
export function* сurrenciesSaga(){
    yield all([
        takeLatest(fetchСurrencies, fetchCurrencies)
    ])
}

