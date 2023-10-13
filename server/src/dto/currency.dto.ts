export class ICurrency{
    readonly name:string;
    readonly value:number;
    readonly rus:string;
    readonly isShowed:boolean;
}
export class addCurrencyInformationDto{
    readonly name:string;
    readonly rus:string;
    readonly value:number;
}
export class displayCurrencyDto{
    readonly name:string
}
export class getCurrencyValueDto{
    readonly name:string[];
    readonly value:number;
}
export class getExactCurrencyDto{
    readonly name:string;
}
export class currencySortDto {
    readonly type:boolean;
}