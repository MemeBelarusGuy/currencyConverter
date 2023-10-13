import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CurrencyUpdateController} from "./currencyUpdate.controller";
import {CurrencyUpdateService} from "./currencyUpdate.service";
import {CurrencyUpdate, CurrencyUpdateSchema} from "./schemas/currencyUpdate.schema";
import {Currency, CurrencySchema} from "../currency/schemas/currency.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: CurrencyUpdate.name, schema: CurrencyUpdateSchema},
            {name:Currency.name,schema:CurrencySchema}
        ]),
    ],
    controllers: [CurrencyUpdateController],
    providers: [CurrencyUpdateService]
})
export class CurrencyUpdateModule {
}