import React, {useState} from 'react';
import styles from './currencyTable.module.scss'
import {ICurrencyTable} from "../../../utils/IProps/ICurrencyTable";
import {sortDown, sortUp, USD} from "../../../constants/values";
import CurrencyRow from "./currencyRow/currencyRow";
import {currency, currencyName, usdValue} from "../../../constants/messages";

function CurrencyTable({sortCurrencyByName, sortCurrencyByValue, sortingData}: ICurrencyTable) {
    const [isAlphabetSort, setIsAlphabetSort] = useState(false);
    const [isValueSort, setIsValueSort] = useState(false);
    const rows = sortingData.map((item,index) => item.name !== USD &&
        <CurrencyRow key={index} name={item.name} rus={item.rus} value={item.value} isShowed={item.isShowed}/>)
    const sortTable = (sortFunc: Function, setSort: Function, value: boolean) => {
        sortFunc();
        setSort(!value)
    }
    return (
        <table className={styles.currencyTable}>
            <thead>
            <tr>
                <th>{currency}</th>
                <th>{currencyName}
                    <button className={styles.sortAlphabet}
                            onClick={() => sortTable(sortCurrencyByName, setIsAlphabetSort, isAlphabetSort)}>{isAlphabetSort ? sortDown : sortUp}</button>
                </th>
                <th>{usdValue}
                    <button className={styles.sortAlphabet}
                            onClick={() => sortTable(sortCurrencyByValue, setIsValueSort, isValueSort)}>{isValueSort ? sortDown : sortUp}</button>
                </th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
}

export default CurrencyTable;