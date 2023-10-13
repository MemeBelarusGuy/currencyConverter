import {CurrencyUpdate, CurrencyUpdateDocument} from "./schemas/currencyUpdate.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Currency, CurrencyDocument} from "../currency/schemas/currency.schema";
import axios from 'axios'
import {twoHours} from "../constants/values";
import {updateAllCurrencyLink} from "../utils/API/linksAPI";

export class CurrencyUpdateService {
    constructor(
        @InjectModel(CurrencyUpdate.name) private CurrencyUpdateModel: Model<CurrencyUpdateDocument>,
        @InjectModel(Currency.name) private CurrencyModel: Model<CurrencyDocument>) {
    }

    async getLastTimeUpdate(): Promise<number> {
        try {
            const data = await this.CurrencyUpdateModel.find();
            if (!data.length) {
                const newData = await this.CurrencyUpdateModel.create({
                    lastTimeUpdated: Date.now(),
                    lastUsdValue: 1
                });
                return newData.lastTimeUpdated;
            }
            return data[0].lastTimeUpdated;
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async updateAllCurrency() {
        try {
            const lastTimeUpdated = await this.CurrencyUpdateModel.find();
            if (lastTimeUpdated.length && Date.now() - lastTimeUpdated[0].lastTimeUpdated > twoHours) {
                const currency = await this.CurrencyModel.find();
                const {data} = await axios.get(updateAllCurrencyLink())
                for (const key of currency) {
                    if (key.value === data.conversion_rates[key.name]) continue;
                    await this.CurrencyModel.findOneAndUpdate({name: key.name}, {value: data.conversion_rates[key.name]})
                }
                lastTimeUpdated[0].lastTimeUpdated = Date.now();
                await lastTimeUpdated[0].save();
                return await this.CurrencyModel.find();
            }
            return 0;
        } catch (e) {
            console.log(e)
        }
    }
}
