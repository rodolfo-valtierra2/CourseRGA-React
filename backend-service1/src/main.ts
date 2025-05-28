import { NestFactory } from '@nestjs/core';
import { ProjectModule } from './project.module';

async function bootstrap() {
  const app = await NestFactory.create(ProjectModule, {cors: true});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
