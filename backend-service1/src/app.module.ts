import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ProyectsModule } from './proyects/proyects.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
   imports:[
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    MongooseModule.forRoot('mongodb://localhost',
      {
        dbName: 'Proyects'
      }
    ),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    AuthModule,
    UsersModule,
    ProyectsModule,
  ],
})

export class ProjectModule { }
