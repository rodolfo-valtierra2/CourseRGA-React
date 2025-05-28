import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IProject } from './interface/IProject.interface';
import { ProjectDto } from './validations/Project.dto';
//let {MOCK_PROJECTS} = require('./utils/MockProjects')

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<IProject>){}

  async getProjects(query=null): Promise<IProject[]>{
    if (!query)
       return await this.projectModel.find();
    let {_page, _limit, _sort} = query;
    
    // return MOCK_PROJECTS.filter((m, i) => (i*_page)===i && _limit && _limit--)
    // .sort((a, b) => a[_sort]<b[_sort]);
    const projects = await this.projectModel.find().skip(_page).limit(_limit);
    if(!projects || !projects.length)
      throw new NotFoundException('Project data not found');

    return projects;
  }

  async updateProjects(id:string, data: any): Promise<IProject>  {
    // const i = MOCK_PROJECTS.findIndex(m => m.id===id)
    // MOCK_PROJECTS[i] = data;
    // return MOCK_PROJECTS[i];
    const projectUp = await this.projectModel.findByIdAndUpdate({_id: id}, {$set: data});

    if(!projectUp) throw new NotFoundException(`Project ${id} not found`)

    return projectUp;
  }

  async create(data: ProjectDto): Promise<IProject> {
    // data.id = MOCK_PROJECTS[MOCK_PROJECTS.length-1].id+1;
    // MOCK_PROJECTS.push(data);
    // return MOCK_PROJECTS[MOCK_PROJECTS.length-1];
    const project = await new this.projectModel(data);
    return project.save();
  }

  async deleteId(id): Promise<string> {
    const deleted = await this.projectModel.findByIdAndDelete(id).exec();

    if(!deleted)
      throw new NotFoundException("Delete id not found");

    return 'id deleted';
  }

  async findById (id:string): Promise<IProject>{
    //id = new mongoose.Schema.ObjectId(id)
    const projects = await this.projectModel.findById(id).exec()
    if (!projects)
      throw new NotFoundException("There is not projects")

    return projects;


  }
}
