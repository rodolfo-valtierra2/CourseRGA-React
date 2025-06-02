import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { UsersService } from './services/users.service';
import { Project, ProjectSchema } from './schemas/project.schema';
import { UsersController } from './controllers/users.controller';
import { ProyectController } from './proyect/proyect.controller';
import { ProyectsModule } from './proyects/proyects.module';

@Module({
   imports:[
    MongooseModule.forRoot('mongodb://localhost:27017',
      {
        dbName: 'Projects'
      }
    ),
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
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
    UsersModule,
    AuthModule,
    ProyectsModule,
  ]
})

export class ProjectModule { }
