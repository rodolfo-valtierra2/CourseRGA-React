import {useState} from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

interface ProjectListProps {
  projects: Project[];
	isLoading: bool;
	error: object[]
}

function ProjectList({ projects, onSave, isLoading, error}: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState();  

  const handleEdit = (project) => {
     setProjectBeingEdited(project);
   };

   const cancelEdit = () => {
      setProjectBeingEdited(null)
   }

   if (isLoading)
   return <div className="row">
    <div className="card large error">
      <section>
        <p>
          <span className="icon-alert inverse "></span>
          {error}
        </p>
      </section>
    </div>
  </div>

   return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? 
            <ProjectForm 
            project={project}
              onCancel={cancelEdit} 
              onSave={onSave} />
           : 
            <ProjectCard project={project} onEdit={handleEdit} />
          }
        </div>
      ))}
    </div>
  );
 
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired
};

export default ProjectList;
