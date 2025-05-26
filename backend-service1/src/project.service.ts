import { Injectable } from '@nestjs/common';
import {Project} from './utils/Project'
let {MOCK_PROJECTS} = require('./utils/MockProjects')

@Injectable()
export class ProjectService {
  getProjects(query=null): Project[]{
    if (!query)
      return MOCK_PROJECTS;
    let {_page, _limit, _sort} = query;
    
    return MOCK_PROJECTS.filter((m, i) => (i*_page)===i && _limit && _limit--)
    .sort((a, b) => a[_sort]<b[_sort]);
  }

  updateProjects(id, data): Project {
    const i = MOCK_PROJECTS.findIndex(m => m.id===id)
    MOCK_PROJECTS[i] = data;
    return MOCK_PROJECTS[i];
  }

  create(data): Project {
    data.id = MOCK_PROJECTS[MOCK_PROJECTS.length-1].id+1;
    MOCK_PROJECTS.push(data);
    return MOCK_PROJECTS[MOCK_PROJECTS.length-1];
  }

  deleteId(id): string {
    MOCK_PROJECTS = MOCK_PROJECTS.filter(m => m.id==id)
    return 'id deleted';
  }

  findById (id): Project{
    return MOCK_PROJECTS.find(m => m.id==id)
  }
}
