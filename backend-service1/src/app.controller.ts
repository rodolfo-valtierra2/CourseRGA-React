import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Project} from './utils/Project';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Project {
    return this.appService.getHello();
  }

	@Post()
	updateProject(@Req() request: Request): string {
		console.log(request.body)
		return 'success'
	}
}
