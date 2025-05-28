import { Controller, Get, Post, Req, Put, Delete, Param, Query, Res, Body, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { IProject } from './interface/IProject.interface';
import { ProjectDto } from './validations/Project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}

  @Get()
  getFilter(@Query() query: any): Promise<IProject[]> {
    return this.ProjectService.getProjects(query);
  }

  @Get()
  getAll(): Promise<IProject[]> {
    return this.ProjectService.getProjects();
  }

	@Put(':id')
	setUpdate(@Req() req: Request, @Param() param: any): Promise<IProject> {
		return this.ProjectService.updateProjects(param.id, req.body);
	}

  @Post()
  async create(@Body() body: ProjectDto){
      const data = await this.ProjectService.create(body);
      return data;
  }

  @Delete(':id')
  deleteId(@Param() param: any): Promise<string> {
    return this.ProjectService.deleteId(param.id);
  }

  @Get(":id")
  findById (@Param() param: any): Promise<IProject> {
      const project = this.ProjectService.findById(param.id)
      project.catch(console.log)
    return project;
  }
}
