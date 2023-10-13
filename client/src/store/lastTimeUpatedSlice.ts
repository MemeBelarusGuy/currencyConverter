import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {lastTimeUpdated} from "../constants/path";
import {GET_LAST_TIME_UPDATE, UPDATE_ALL_CURRENCIES} from "../constants/actionTypes";
import {lastUpdate} from "../constants/slices";

export const getLastTimeUpdate = createAsyncThunk(GET_LAST_TIME_UPDATE,
    async () => {
        const {data} = await axios.get(lastTimeUpdated);
        return data;
    })
export const updateAllCurrencies = createAsyncThunk(UPDATE_ALL_CURRENCIES,
    async () => {
        const {data}=await axios.post(lastTimeUpdated);
        return data;
    })

export interface ILastTimeUpdated {
    time: number
}

const initialState: ILastTimeUpdated = {
    time: 0
}

export const timeSlice = createSlice({
    name: lastUpdate,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLastTimeUpdate.fulfilled, (state, {payload}) => {
            console.log("getLastTimeUpdate fulfilled");
            state.time = payload;
        })
        builder.addCase(getLastTimeUpdate.pending, (state, action) => {
            console.log("getLastTimeUpdate pending");
        })
        builder.addCase(getLastTimeUpdate.rejected, (state, action) => {
            console.log("getLastTimeUpdate rejected");
        })
    }
})


// Action creators are generated for each case reducer function
export const {} = timeSlice.actions

export default timeSlice.reducer