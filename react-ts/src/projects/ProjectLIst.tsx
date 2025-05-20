import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'


function ProjectList({ projects }) {
  const handleEdit = (project) => {
     console.log(project);
   };

   return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          <ProjectCard project={project} onEdit={handleEdit}/>
          <ProjectForm/>
        </div>
      ))}
    </div>
  );
 
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
};

export default ProjectList;