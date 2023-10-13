import {store} from "../../store/store";
import {switchDisplayCurrency} from "../../store/currencySlice";
export const switchCurrency=(name:string)=>{
    return store.dispatch(switchDisplayCurrency({name}));
}