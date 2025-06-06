import { Project } from '../utils/Project.ts';
import ProjectList from './ProjectLIst.tsx';
import {useEffect, useState, type SyntheticEvent} from 'react'
import {projectAPI} from '../Requests/ProjectAPI.ts'

function ProjectsPage(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false)
    const [isFetching] = useState(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    const [currentPage, setCurrentPage ] = useState(0);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            setError(undefined);

            try {
                const data = await projectAPI.get(currentPage);
                setProjects(data);
            }catch (e) {
							if(e instanceof Error)
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [currentPage])

    const handleMoreClick = () => {
        setCurrentPage((page) => page+1)
    }

    const saveProject = (project: Project) => { 
        projectAPI
				.put(project)
				.then(updatedProject => {
					const updatedProjects = new Project(updatedProject)
          projects.push(updatedProjects)
					setProjects([...projects])
				}).catch(e => {
					if (e instanceof Error) 
						setError(e)
				})
    }

    const deleteProject = (id:string | undefined) => {
      setProjects([...projects.filter(p => p._id!==id)])
    }

    const searchName = (event: SyntheticEvent) => {
      const search = (event.target as HTMLInputElement).value; 

      if (isFetching){
        setTimeout(() => {
          projectAPI.get(0,search)
        }, 500)
      }
    }

    if (loading )
        return <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
        </div>

    return <>
        <h1>Projects</h1>
        <input placeholder='Search name' onChange={searchName}/>
        <ProjectList onSave={saveProject} 
          projects={projects} 
          isLoading={loading}
          error={error}
          onDelete={deleteProject}/>
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" 
              onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
    </>
}

export default ProjectsPage;
