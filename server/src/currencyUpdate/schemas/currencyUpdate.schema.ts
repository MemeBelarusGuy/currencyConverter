import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
export type CurrencyUpdateDocument = HydratedDocument<CurrencyUpdate>

@Schema()
export class CurrencyUpdate {
    @Prop()
    lastTimeUpdated: number;
}
export const CurrencyUpdateSchema = SchemaFactory.createForClass(CurrencyUpdate);