import {MOCK_PROJECTS} from './MockProjects.ts'
import type { Project } from './Project.ts';
import ProjectList from './ProjectList';
import {useEffect, useState} from 'react'
import {projectAPI} from './ProjectAPI'

function ProjectsPage(){
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [currentPage, setCUrrentPage ] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            setError(null);

            try {
                const data = await projectAPI.get(currentPage);
                setProjects(data);
            }catch (e) {
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
         let updatedProjects = projects.map((p) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
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
        onLoading={loading}/>
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