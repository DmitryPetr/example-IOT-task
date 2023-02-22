import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Events, EventsSchema } from "@/models/schemas/events.schema";
import {EventController} from "@/modules/events/events.controller";
import {EventsService} from "@/modules/events/events.service";
import { RABBITMQ_URL_DEFAULT, RABBITMQ_URL_SEND_DEFAULT } from '@/config/mainConfig';

@Module({
  imports: [
/*    MongooseModule.forFeature([
      { name: Events.name, schema: EventsSchema },
    ]),*/
    ClientsModule.register([
      {
        name: 'connect',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL ?? RABBITMQ_URL_DEFAULT],
          queue: RABBITMQ_URL_SEND_DEFAULT,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
