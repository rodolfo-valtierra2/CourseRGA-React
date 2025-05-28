import { Controller, Get, Post, Req, Put, Delete, Param, Query, Res, Body, HttpStatus, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { IProject } from './interface/IProject.interface';
import { ProjectDto } from './validations/Project.dto';
import { isPromise } from 'util/types';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('projects')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}

  @Get()
  getFilter(@Query() query): Promise<IProject[]> {
    return this.ProjectService.getProjects(query);
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
    return await this.ProjectService.create(body);
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
