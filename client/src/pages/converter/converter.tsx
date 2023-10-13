import React, {useEffect, useState} from 'react';
import styles from './converter.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CurrencyItem from "./currencyItem/currencyItem";
import {switchCurrency} from "../../utils/helpers/switchCurrency";
import {getDisplayedCurrencyLength} from "../../utils/helpers/getDisplayedCurrencyLength";
import {updateCurrencyValues} from "../../utils/helpers/updateCurrencyValues";
import {NavLink} from "react-router-dom";
import {
    basis,
    empty,
    multiStart,
    startObj, zero
} from "../../constants/values";
import Option from "./option/option";
import {chooseCurrency, everyCurrencyAdded, haventAddedCurrency, review, toReview} from "../../constants/messages";

function Converter() {
    const {currencyData} = useSelector((state: RootState) => state.currency);
    const {usdValues} = useSelector((state: RootState) => state.currency);
    const stateMulti = useSelector((state: RootState) => state.currency.multi);
    const [multi, setMulti] = useState(multiStart);
    const [notUpdate, setNotUpdate] = useState(startObj);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (multi > 0 && multi) {
            updateCurrencyValues(currencyData, multi, setIsLoading)
        }
    }, [multi]);
    const data = currencyData.map((item, index) => item.isShowed &&
        <CurrencyItem name={item.name} value={item.name === notUpdate.name ? notUpdate.value : item.value}
                      usdValue={stateMulti ? usdValues[index] : item.value}
                      setMulti={setMulti} multi={multi}
                      setNotUpdate={setNotUpdate} key={index}
                      rus={item.rus}
                      setIsLoading={setIsLoading}
                      isLoading={isLoading && item.name !== notUpdate.name}/>)
    const options = currencyData.map((item, index) => !item.isShowed &&
        <Option key={index} name={item.name} rus={item.rus}/>)
    const [addedCurrency, setAddedCurrency] = useState(empty);
    useEffect(() => {
        if (addedCurrency) {
            setIsLoading(true);
            switchCurrency(addedCurrency).then(() => {
                if (multi === multiStart) setMulti(stateMulti || basis);
                else updateCurrencyValues(currencyData, multi, setIsLoading);
            })
        }
    }, [addedCurrency]);
    return (<>
            {isLoading && multi !== zero && <div className={styles.loading}></div>}
            {getDisplayedCurrencyLength(currencyData) ? <main className={styles.converter}>
                {data}
            </main> : <div className={styles.message}>{haventAddedCurrency}</div>}
            <header className={styles.adding}>
                {options.length === getDisplayedCurrencyLength(currencyData) ? <div>{everyCurrencyAdded}</div> :
                    <select onChange={(e) => setAddedCurrency(e.target.value)}>
                        <option value={empty}>{chooseCurrency}</option>
                        {options}
                    </select>}
            </header>
            <NavLink to={review} className={styles.link}>{toReview}</NavLink>
        </>
    );
}

export default Converter;