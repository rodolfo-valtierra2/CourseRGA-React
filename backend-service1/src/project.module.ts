import { Module } from '@nestjs/common';
import {MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import Schema from './schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',
      {
        dbName: 'Projects'
      }
    ),
    MongooseModule.forFeature(Schema)
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})

export class ProjectModule {}
