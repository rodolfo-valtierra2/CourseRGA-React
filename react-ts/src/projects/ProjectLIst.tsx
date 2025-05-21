import {useState} from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'


function ProjectList({ projects, onSave}) {
  const [projectBeingEdited, setProjectBeingEdited] = useState();  

  const handleEdit = (project) => {
     setProjectBeingEdited(project);
   };

   const cancelEdit = () => {
      setProjectBeingEdited(null)
   }

   return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? 
            <ProjectForm 
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
    onSave: PropTypes.func.isRequired
};

export default ProjectList;