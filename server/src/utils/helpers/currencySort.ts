import {ICurrency} from "../../dto/currency.dto";

export const currencyNameSort=(currency:ICurrency[],type:boolean)=>{
    const sorted=currency.sort((a, b) => a.rus.localeCompare(b.rus));
    if (type) return sorted;
    return sorted.reverse();
}
export const currencyValueSort=(currency:ICurrency[],type:boolean)=>{
    const sorted=currency.sort((a, b) => a.value - b.value);
    if (type) return sorted;
    return sorted.reverse();
}