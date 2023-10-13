import {ICurrency} from "../../store/currencySlice";

export interface ICurrencyTable{
    sortCurrencyByName:Function,
    sortCurrencyByValue:Function,
    sortingData:ICurrency[]
}