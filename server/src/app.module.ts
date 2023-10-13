import { Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv'
import {CurrencyModule} from "./currency/currency.module";
import {CurrencyUpdateModule} from "./currencyUpdate/currencyUpdate.module";
dotenv.config()

@Module({
    imports:[
        MongooseModule.forRoot(`${process.env.DB_URL}`),
        CurrencyModule,
        CurrencyUpdateModule
    ],
})

export class AppModule {}
