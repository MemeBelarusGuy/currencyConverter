import {store} from "../../store/store";

export const sortCurrency = (setIsLoading: Function, setTypeSort: Function,valueSort: boolean,sortFunc:Function) => {
    setIsLoading(true);
    setTypeSort(!valueSort)
    store.dispatch(sortFunc({type: valueSort})).then(() => setIsLoading(false))
}