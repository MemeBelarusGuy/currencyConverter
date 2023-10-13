import {Currency, CurrencyDocument} from "./schemas/currency.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {
    addCurrencyInformationDto,
    currencySortDto, displayCurrencyDto,
    getCurrencyValueDto, getExactCurrencyDto, ICurrency,
} from "../dto/currency.dto";
import {currencyNameSort, currencyValueSort} from "../utils/helpers/currencySort";

export class CurrencyService {
    constructor(@InjectModel(Currency.name) private CurrencyModel: Model<CurrencyDocument>) {
    }

    async getAllCurrency() {
        try {
            return await this.CurrencyModel.find();
        } catch (e) {
            console.log(e)
        }
    }

    async getExactCurrency({name}: getExactCurrencyDto) {
        try {
            return await this.CurrencyModel.findOne({name});
        } catch (e) {
            console.log(e);
        }
    }

    async addCurrencyInformation({name, rus, value}: addCurrencyInformationDto) {
        try {
            return await this.CurrencyModel.create({
                name,
                rus,
                value,
                isShowed: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    async displayCurrency({name}: displayCurrencyDto) {
        try {
            const currency = await this.CurrencyModel.findOne({name});
            if (currency) {
                currency.isShowed = !currency.isShowed;
                await currency.save()
                return currency;
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getCurrencyValueFromUsd({name, value}: getCurrencyValueDto) {
        try {
            const currency: ICurrency[] = [];
            let tmp;
            for (const item of name) {
                tmp = await this.CurrencyModel.findOne({name: item});
                if (tmp) currency.push({
                    name: tmp.name,
                    rus: tmp.rus,
                    isShowed: tmp.isShowed,
                    value: Number((value * tmp!.value).toFixed(5))
                });
            }
            return currency;
        } catch (e) {
            console.log(e)
        }
    }

    async sortCurrencyByName({type}: currencySortDto) {
        try {
            const currency = await this.CurrencyModel.find();
            return currencyNameSort(currency,type);
        } catch (e) {
            console.log(e);
        }
    }

    async sortCurrencyByValue({type}: currencySortDto) {
        try {
            const currency = await this.CurrencyModel.find();
            return  currencyValueSort(currency,type);
        } catch (e) {
            console.log(e);
        }
    }

}
