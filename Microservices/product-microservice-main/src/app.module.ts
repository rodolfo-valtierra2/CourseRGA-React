import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product_entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'product_microservices',
      entities: [ProductEntity],
      synchronize: true
    }),
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
