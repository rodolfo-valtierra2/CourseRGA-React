import { Project } from './Project.ts';
import ProjectList from './ProjectList.tsx';
import {useEffect, useState} from 'react'
import {projectAPI} from './ProjectAPI'

function ProjectsPage(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            setError(null);

            try {
                const data = await projectAPI.get(currentPage);
                setProjects(data);
            }catch (e) {
							if(e instanceof Error)
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [currentPage])

    const handleMoreClick = () => {
        setCUrrentPage((page) => page+1)
    }

    const saveProject = (project: Project) => {
        projectAPI
				.put(project)
				.then(updatedProject => {
					const updatedProjects = project.map((p:Project) => 
						p.id===project.id?new Project(updatedProject):p)
					setProjects(updatedProjects)
				}).catch(e => {
					if (e instanceof Error) 
						setError(e.message)
				})
    }

    if (loading )
        return <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
        </div>

    return <>
        <h1>Projects</h1>
        <ProjectList onSave={saveProject} 
        projects={projects} 
        onLoading={loading}
				error={error}/>
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
