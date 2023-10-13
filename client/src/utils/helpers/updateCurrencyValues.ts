import {getConvertedCurrency, ICurrency, setMultiState} from "../../store/currencySlice";
import {store} from "../../store/store";

export const updateCurrencyValues=(currencyData:ICurrency[],multi:number,setIsLoading:Function)=>{
    const names: string[] = [];
    for (const item of currencyData) {
        names.push(item.name);
    }
    console.log("boom we here "+multi)
    store.dispatch(setMultiState(multi))
    store.dispatch(getConvertedCurrency({name: names, value: multi})).then(() => {
        setIsLoading(false)
    });
}