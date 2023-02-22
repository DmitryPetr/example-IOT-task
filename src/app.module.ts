import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import {
  databaseHostDefault,
  databaseName,
  MongoDefaultPath,
  mongoDefaultPort,
} from '@/config/mainConfig';
import {EventsModule} from "@/modules/events/events.module";

@Module({
  imports: [
    //  UserModule,
    MongooseModule.forRoot(
      `${MongoDefaultPath}${
        process.env.DATABASE_HOST_DEFAULT ?? databaseHostDefault
      }:${process.env.MONGO_DEFAULT_PORT ?? mongoDefaultPort}/${
        process.env.DATABASE_NAME ?? databaseName
      }`,
    ),
    ConfigModule.forRoot(),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
