import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Microservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP
  });

  //await app.listen(process.env.PORT ?? 3000)
  await app.listen(() => {
    logger.log('Microservice is listening')
  });
}
bootstrap();
