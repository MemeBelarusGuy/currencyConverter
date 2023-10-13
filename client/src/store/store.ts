import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import currencyReducer from "./currencySlice";
import sortingReducer from "./allCurrencyInformationSlice";
import timeReducer from "./lastTimeUpatedSlice";

export const store = configureStore({
    reducer: {
        currency:currencyReducer,
        sortCurrency:sortingReducer,
        lastUpdate:timeReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
(window as any).store=store;//able to check store by store.getState()
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()