import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from '../interfaces/IProject.interface';
import { ProjectDto } from '../validations/Project.dto';
import { Project } from 'src/schemas/project.schema';
//let {MOCK_PROJECTS} = require('./utils/MockProjects')

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<IProject>){}

  async getProjects(query={_page:0, _limit:0, _sort:''}): Promise<IProject[]>{
    let {_page, _limit, _sort} = query;
    let q = this.projectModel.find();

    if (_sort)
      q.find({name: {$regex: _sort}})

    const projects = await q.skip(_page).limit(_limit);

    return projects || [];
  }

  async updateProjects(id:string, data: any): Promise<IProject>  {
    const projectUp = await this.projectModel.findByIdAndUpdate({_id: id}, {$set: data});

    if(!projectUp) throw new NotFoundException(`Project ${id} not found`)

    return projectUp;
  }

  async create(data: ProjectDto): Promise<IProject> {
    const project = await new this.projectModel(data);
    return project.save();
  }

  async deleteId(id): Promise<string> {
    const deleted = await this.projectModel.findByIdAndDelete(id).exec();

    return 'id deleted';
  }

  async findById (id:string): Promise<IProject>{
    const projects = await this.projectModel.findById(id).exec()
    if (!projects)
      throw new NotFoundException("There is not projects")

    return projects;


  }
}
