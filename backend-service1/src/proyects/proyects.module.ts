import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from 'src/controllers/project.controller';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { ProjectService } from 'src/services/project.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',
      {
        dbName: 'Projects'
      }
    ),
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProyectsModule {}
