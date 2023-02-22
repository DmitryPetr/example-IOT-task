import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type EventsDocument = Events & Document;

@Schema()
export class Events {
  @ApiProperty({
    description: 'Значение',
    default: 'Отправка сообщенния',
  })
  @Prop({
    type: String
  })
  value: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
