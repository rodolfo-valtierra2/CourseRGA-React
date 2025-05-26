import { Controller, Get, Post, Req, Put, Delete, Param, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import {Project} from './utils/Project';

@Controller('projects')
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Get()
  getFilter(@Query() query: any): Project[] {
    return this.appService.getProjects(query);
  }

  @Get()
  getAll(): Project[] {
    return this.appService.getProjects();
  }

	@Put(':id')
	setUpdate(@Req() req: Request, @Param() param: any): Project {
		return this.appService.updateProjects(param.id, req.body);
	}

  @Post() 
  set(@Req() req: Request): Project{
    return this.appService.create(req.body);
  }

  @Delete()
  deleteId(@Param() param: any): string {
    return this.appService.deleteId(param.id);
  }

  @Get(":id")
  findById (@Param() param: any): Project {
    return this.appService.findById(param.id);
  }
}
