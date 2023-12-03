import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { ICurrencies } from "../models/ICurrencies";
import { fetchСurrencies, getСurrencies } from "./currenciesSlice";

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