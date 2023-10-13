import {Controller, Get, Post} from "@nestjs/common";
import {CurrencyUpdateService} from "./currencyUpdate.service";
import {defaultPath, lastTimeUpdated} from "../constants/path";

@Controller(lastTimeUpdated)
export class CurrencyUpdateController {
    constructor(private currencyUpdateService: CurrencyUpdateService) {
    }
    @Get(defaultPath)
    getLastTimeUpdated(){
        return this.currencyUpdateService.getLastTimeUpdate();
    }
    @Post(defaultPath)
    updateAllCurrency(){
        return this.currencyUpdateService.updateAllCurrency();
    }
}
