import { Controller, Get, Post, Put, Delete, Param, Query, Res, Body, HttpStatus, ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { IProject } from '../interfaces/IProject.interface';
import { ProjectDto } from '../validations/Project.dto';
import { AccessTokenGuard } from 'src/common/guards/access_token';

@UseGuards(AccessTokenGuard)
@Controller('proyects')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}
  
  @Get()
  async getFilter(@Query() query): Promise<IProject[]> {
    const project = await this.ProjectService.getProjects(query);
    return project;
  }

  @Get()
  getAll(): Promise<IProject[]> {
    return this.ProjectService.getProjects();
  }

	@Put(':id')
	setUpdate(@Body() body: ProjectDto, @Param() param): Promise<IProject> {
		return this.ProjectService.updateProjects(param.id, body);
	}

  @Post()
  async create(@Body() body: ProjectDto){
    return await this.ProjectService.create({
      ...body, 
      name: body.name.trim(),
      description: body.description.trim()
    });
  }

  @Delete(':id')
  deleteId(@Param() param: any): Promise<string> {
    return this.ProjectService.deleteId(param.id);
  }

  @Get(":id")
  findById (@Param('id') id: string): Promise<IProject> {
    const project = this.ProjectService.findById(id)
    return project;
  }
}
