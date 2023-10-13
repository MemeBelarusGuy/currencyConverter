import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {RootState, useAppDispatch} from "./store/store";
import {getAllCurrency} from "./store/currencySlice";
import Converter from "./pages/converter/converter";
import Review from "./pages/review/review";
import {getLastTimeUpdate, updateAllCurrencies} from "./store/lastTimeUpatedSlice";
import {useSelector} from "react-redux";
import {oneHour} from "./constants/values";

function App() {
    const dispatch = useAppDispatch();
    const lastTimeUpdated = useSelector((state: RootState) => state.lastUpdate.time);
    const [isChecking, setIsChecking] = useState(false);
    useEffect(() => {
        dispatch(getAllCurrency());
        dispatch(getLastTimeUpdate());
    }, []);
    useEffect(() => {
        if (!isChecking) {
            setIsChecking(true)
            setInterval(() => dispatch(updateAllCurrencies()), oneHour)//check every hour
        }
    }, [lastTimeUpdated]);
    return (
        <Routes>
            <Route path={"/"} element={<Converter/>}/>
            <Route path={"/all"} element={<Review/>}/>
        </Routes>
    );
}

export default App;
