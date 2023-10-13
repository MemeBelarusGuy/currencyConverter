import {Body, Controller, Get, Post} from "@nestjs/common";
import {CurrencyService} from "./currency.service";
import {
    addCurrencyInformationDto,
    currencySortDto, displayCurrencyDto,
    getCurrencyValueDto, getExactCurrencyDto,
} from "../dto/currency.dto";
import {
    addCurrencyInformation, currency,
    defaultPath,
    displayCurrency,
    getCurrencyValue,
    nameSort,
    valueSort
} from "../constants/path";

@Controller(currency)
export class CurrencyController {
    constructor(private currencyService: CurrencyService) {
    }

    @Get(defaultPath)
    getAllCurrency() {
        return this.currencyService.getAllCurrency();
    }
    @Post(defaultPath)
    getExactCurrency(@Body()dto:getExactCurrencyDto){
        return this.currencyService.getExactCurrency(dto);
    }
    @Post(addCurrencyInformation)
    addCurrencyInformation(@Body()dto:addCurrencyInformationDto){
        return this.currencyService.addCurrencyInformation(dto);
    }
    @Post(getCurrencyValue)
    getCurrencyValue(@Body()dto:getCurrencyValueDto){
        return this.currencyService.getCurrencyValueFromUsd(dto);
    }
    @Post(displayCurrency)
    displayCurrency(@Body()dto:displayCurrencyDto){
        return this.currencyService.displayCurrency(dto);
    }
    @Post(nameSort)
    sortCurrencyByName(@Body()dto:currencySortDto){
        return this.currencyService.sortCurrencyByName(dto);
    }
    @Post(valueSort)
    sortCurrencyByValue(@Body()dto:currencySortDto){
        return this.currencyService.sortCurrencyByValue(dto);
    }
}