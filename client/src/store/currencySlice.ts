import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ICurrencyUsdValue, IDisplayCurrency} from "../utils/ISliceBody/ICurrency";
import {updateAllCurrencies} from "./lastTimeUpatedSlice";
import {getConvertedCurrencyValue, getEveryCurrency, switchCurrency} from "../constants/path";
import {GET_ALL_CURRENCY, GET_CONVERTED_CURRENCY, SWITCH_DISPLAY_CURRENCY} from "../constants/actionTypes";
import {currency} from "../constants/slices";

export const getAllCurrency = createAsyncThunk(GET_ALL_CURRENCY,
    async () => {
        const {data} = await axios.get(getEveryCurrency);
        return data;
    })
export const getConvertedCurrency = createAsyncThunk(GET_CONVERTED_CURRENCY,
    async (obj: ICurrencyUsdValue) => {
        const {data} = await axios.post(getConvertedCurrencyValue, obj);
        return data;
    })
export const switchDisplayCurrency = createAsyncThunk(SWITCH_DISPLAY_CURRENCY,
    async (obj: IDisplayCurrency) => {
        const {data} = await axios.post(switchCurrency, obj);
        return data;
    })

export interface ICurrency {
    name: string,
    rus: string,
    value: number,
    isShowed: boolean
}

export interface ICurrencyState {
    currencyData: ICurrency[],
    usdValues:number[],
    multi:number
}

const initialState: ICurrencyState = {
    currencyData: [],
    usdValues:[],
    multi:0
}

export const currencySlice = createSlice({
    name: currency,
    initialState,
    reducers: {
        setMultiState(state,action: PayloadAction<number>){
            state.multi=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCurrency.fulfilled, (state, {payload}) => {
            console.log("getAllCurrency fulfilled");
            state.currencyData = [...payload];
            if(!state.multi){
                state.multi=1;
                state.usdValues=[...payload.map((item:ICurrency)=>item.value)]
            }
        })
        builder.addCase(getAllCurrency.pending, (state, action) => {
            console.log("getAllCurrency pending");
        })
        builder.addCase(getAllCurrency.rejected, (state, action) => {
            console.log("getAllCurrency rejected");
        })
        builder.addCase(updateAllCurrencies.fulfilled, (state, {payload}) => {
            console.log("updateAllCurrencies state fulfilled");
            if(payload) state.currencyData = [...payload]; //if currency data changed
        })
        builder.addCase(updateAllCurrencies.pending, (state, action) => {
            console.log("updateAllCurrencies state  pending");
        })
        builder.addCase(updateAllCurrencies.rejected, (state, action) => {
            console.log("updateAllCurrencies state rejected");
        })
        builder.addCase(getConvertedCurrency.fulfilled, (state, {payload}) => {
            console.log("getConvertedCurrency fulfilled");
            state.currencyData = [...payload];
        })
        builder.addCase(getConvertedCurrency.pending, (state, action) => {
            console.log("getConvertedCurrency pending");
        })
        builder.addCase(getConvertedCurrency.rejected, (state, action) => {
            console.log("getConvertedCurrency rejected");
        })
        builder.addCase(switchDisplayCurrency.fulfilled, (state, {payload}) => {
            console.log("switchDisplayCurrency fulfilled");
            state.currencyData = [...state.currencyData.map((item) => item.name === payload.name ? payload : item)];
        })
        builder.addCase(switchDisplayCurrency.pending, (state, action) => {
            console.log("switchDisplayCurrency pending");
        })
        builder.addCase(switchDisplayCurrency.rejected, (state, action) => {
            console.log("switchDisplayCurrency rejected");
        })
    }
})


// Action creators are generated for each case reducer function
export const { setMultiState} = currencySlice.actions

export default currencySlice.reducer