import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])
  ],
  controllers: [ProjectController],
  providers: [Project, ProjectService],
})
export class ProyectsModule {}
