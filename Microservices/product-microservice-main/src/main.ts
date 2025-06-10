import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP
  });

  //await app.listen()
  await app.listen(process.env.PORT ?? 3000)
  // await app.listen(,(e) => {
  //   logger.log('Microservice is listening')
    
  // });
}
bootstrap();
