import {useState} from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

interface ProjectListProps {
  projects: Project[];
	isLoading: boolean;
	onSave: (project:Project)=> void
	error: project
}

function ProjectList({ projects, onSave, isLoading, error}: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState();  

  const handleEdit = (project:Project) => {
     setProjectBeingEdited(project);
   };

   const cancelEdit = () => {
      setProjectBeingEdited(new Project())
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
      {projects.map((project, i) => (
        <div key={i} className="cols-sm">
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

export default ProjectList;
