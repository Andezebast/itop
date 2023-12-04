import axios, {AxiosResponse} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICurrencies } from "../models/ICurrencies";

interface ICurrenciesState{
    сurrencies: ICurrencies[],
}

const initialState: ICurrenciesState = {
    сurrencies: []
}

export const сurrenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        fetchСurrencies(){},
        getСurrencies(state, action: PayloadAction<ICurrencies[]>){
            state.сurrencies = action.payload;
        }
    }
})

export const {fetchСurrencies, getСurrencies} = сurrenciesSlice.actions;

export default сurrenciesSlice.reducer;


