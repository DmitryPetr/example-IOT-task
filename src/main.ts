import { NestFactory } from '@nestjs/core';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { RABBITMQ_QUEUE_DEFAULT, RABBITMQ_URL_DEFAULT } from '@/config/mainConfig';

config();

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL ?? RABBITMQ_URL_DEFAULT],
          queue: process.env.QUEUE_NAME ?? RABBITMQ_QUEUE_DEFAULT,
          noAck: true,
          queueOptions: {
            durable: false,
          },
        },
      },
      { inheritAppConfig: true },
  );
    const configSwagger = new DocumentBuilder()
        .setTitle(`Event device microservice`)
        .addApiKey(
            {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: `Enter your bearer toket in the format: <strong>Bearer (token)</strong>`,
            },
            'bearerAuth',
        )
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger, {
        deepScanRoutes: true,
    });
    process.env.NODE_ENV !== 'production' &&
    SwaggerModule.setup(
        `api/`,
        app,
        document,
    );

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap().then(
    () => {
      console.log('Service successful started');
    },
    (error) => {
      console.log('Service stopped with error');
      console.log(error);
    },
);
