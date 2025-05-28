import { Project } from './Project.ts';
import ProjectList from './ProjectLIst.tsx';
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
            setError(undefined);

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
        setCurrentPage((page) => page+1)
    }

    const saveProject = (project: Project) => {
        projectAPI
				.put(project)
				.then(updatedProject => {
					const updatedProjects = projects.map((p:Project) => 
						p._id===project._id?new Project(updatedProject):p)
					setProjects(updatedProjects)
				}).catch(e => {
					if (e instanceof Error) 
						setError(e.message)
				})
    }

    const deleteProject = (id) => {
      const i = projects.findIndex(p => p._id===id)
      setProjects(p => {
        p.splice(i, 1)
        return p;
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
