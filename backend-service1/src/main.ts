import { NestFactory } from '@nestjs/core';
import { ProjectModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/tranform';
import helmet from 'helmet';
import * as compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(ProjectModule);
  app.enableCors({origin: '*'})
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableVersioning({type: VersioningType.URI})
  app.use(helmet())
  app.use(compression())

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
