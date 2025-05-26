import { Injectable } from '@nestjs/common';
import {Project} from './utils/Project'

@Injectable()
export class AppService {
  getHello(): Project{
    return new Project ();
  }

}
