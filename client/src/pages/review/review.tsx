import React, {useState} from 'react';
import styles from './review.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {sortByName, sortByValue} from "../../store/allCurrencyInformationSlice";
import CurrencyTable from "./currencyTable/currencyTable";
import {sortCurrency} from "../../utils/helpers/sortCurrency";
import {converter, toCurrencyConverter} from "../../constants/messages";

function Review() {
    const {sortingData} = useSelector((state: RootState) => state.sortCurrency);
    const [isAlphabetSort, setIsAlphabetSort] = useState(false);
    const [isValueSort, setIsValueSort] = useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const sortCurrencyByName = () => {
        sortCurrency(setIsLoading,setIsAlphabetSort,isAlphabetSort,sortByName);
    }
    const sortCurrencyByValue = () => {
        sortCurrency(setIsLoading,setIsValueSort,isValueSort,sortByValue);
    }
    return (
        <>
            {isLoading&& <div className={styles.loading}></div>}
            <NavLink to={converter} className={styles.link}>{toCurrencyConverter}</NavLink>
            <CurrencyTable sortingData={sortingData} sortCurrencyByName={sortCurrencyByName} sortCurrencyByValue={sortCurrencyByValue}/>
        </>
    );
}

export default Review;