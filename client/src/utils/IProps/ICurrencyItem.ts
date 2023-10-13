export interface ICurrencyItem{
    name:string,
    value:number,
    usdValue:number,
    rus:string,
    multi:number,
    setMulti:Function,
    setNotUpdate:Function,
    setIsLoading:Function,
    isLoading:boolean
}
export interface IOption{
    name:string,
    rus:string
}