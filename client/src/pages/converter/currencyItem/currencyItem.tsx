import React, {ChangeEvent} from 'react';
import styles from './currencyItem.module.scss'
import {ICurrencyItem} from "../../../utils/IProps/ICurrencyItem";
import {switchCurrency} from "../../../utils/helpers/switchCurrency";
import {empty, multiEmpty, number, zero} from "../../../constants/values";
import {del, greaterThan0} from "../../../constants/messages";

function CurrencyItem({name, value, rus, usdValue,setMulti, setNotUpdate, isLoading, setIsLoading, multi}: ICurrencyItem) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const number = parseFloat(event.target.value);
        if (number < zero) alert(greaterThan0)
        else {
            if (multi === multiEmpty && !isNaN(number) || number) {
                setIsLoading(true);
                setNotUpdate({name, value: number});
                setMulti(number / usdValue);
            } else setMulti(multiEmpty)
        }
    };
    const deleteCurrency = () => {
        setIsLoading(true);
        switchCurrency(name).then(() => setIsLoading(false));
    }
    return (
        <div className={styles.itemArea}>
            <span className={styles.currencyName}>{name}</span>
            <input className={styles.currencyValue} type={number}
                   value={isLoading ? empty : multi === multiEmpty ? empty : value}
                   min={zero}
                   onChange={handleInputChange}/>
            <div className={styles.currencyRus}>{rus}</div>
            <button className={styles.delete} onClick={deleteCurrency}>{del}</button>
        </div>
    );
}

export default CurrencyItem;