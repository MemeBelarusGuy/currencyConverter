import {ICurrency} from "../../store/currencySlice";

export const getDisplayedCurrencyLength=(currencyData:ICurrency[])=>{
    return currencyData.filter((item)=>item.isShowed).length;
}