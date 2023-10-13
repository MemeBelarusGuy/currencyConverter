import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
export type CurrencyDocument = HydratedDocument<Currency>

@Schema()
export class Currency {
    @Prop({ unique: true })
    name: string;
    @Prop()
    rus: string;
    @Prop()
    value: number;
    @Prop()
    isShowed: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);