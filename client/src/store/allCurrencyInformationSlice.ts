import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ISort} from "../utils/ISliceBody/ICurrency";
import axios from "axios";
import {getAllCurrency, ICurrency} from "./currencySlice";
import {updateAllCurrencies} from "./lastTimeUpatedSlice";
import {nameSort, valueSort} from "../constants/path";
import {SORT_BY_NAME, SORT_BY_VALUE} from "../constants/actionTypes";
import {sortCurrency} from "../constants/slices";

export const sortByName = createAsyncThunk(SORT_BY_NAME,
    async (obj: ISort) => {
        const {data} = await axios.post(nameSort, obj);
        return data;
    })
export const sortByValue = createAsyncThunk(SORT_BY_VALUE,
    async (obj: ISort) => {
        const {data} = await axios.post(valueSort, obj);
        return data;
    })

export interface ICurrencyState {
    sortingData: ICurrency[]
}

const initialState: ICurrencyState = {
    sortingData: []
}


export const sortingCurrency = createSlice({
    name: sortCurrency,
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder.addCase(getAllCurrency.fulfilled, (state, {payload}) => {
            console.log("getAllCurrency to sorting state fulfilled");
            state.sortingData = [...payload];
        })
        builder.addCase(getAllCurrency.pending, (state, action) => {
            console.log("getAllCurrency to sorting state  pending");
        })
        builder.addCase(getAllCurrency.rejected, (state, action) => {
            console.log("getAllCurrency to sorting state rejected");
        })
        builder.addCase(updateAllCurrencies.fulfilled, (state, {payload}) => {
            console.log("updateAllCurrencies to sorting state fulfilled");
            if(payload) state.sortingData = [...payload];//if currency data changed
        })
        builder.addCase(updateAllCurrencies.pending, (state, action) => {
            console.log("updateAllCurrencies to sorting state  pending");
        })
        builder.addCase(updateAllCurrencies.rejected, (state, action) => {
            console.log("updateAllCurrencies to sorting state rejected");
        })
        builder.addCase(sortByName.fulfilled, (state, {payload}) => {
            console.log("sortByName fulfilled");
            state.sortingData = [...payload];
        })
        builder.addCase(sortByName.pending, () => {
            console.log("sortByName pending");
        })
        builder.addCase(sortByName.rejected, () => {
            console.log("sortByName rejected");
        })
        builder.addCase(sortByValue.fulfilled, (state, {payload}) => {
            console.log("sortByValue fulfilled");
            state.sortingData = [...payload];
        })
        builder.addCase(sortByValue.pending, () => {
            console.log("sortByValue pending");
        })
        builder.addCase(sortByValue.rejected, () => {
            console.log("sortByValue rejected");
        })

    }
})

// Action creators are generated for each case reducer function
export const {} = sortingCurrency.actions

export default sortingCurrency.reducer