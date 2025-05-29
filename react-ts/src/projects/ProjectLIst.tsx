import { useState } from 'react';
import { Project } from '../utils/Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onSave: (project: Project) => void
  error: Error,
  onDelete: (id: number) => void
}

function ProjectList({ projects, onSave, isLoading, error, onDelete }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState<Project>();
  const [isDeleted, setDeleted] = useState('')

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEdit = () => {
    setProjectBeingEdited(new Project())
  }

  const handleSave = () => {
    onSave(projectBeingEdited);
    setProjectBeingEdited(null);
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
              onSave={handleSave} />
            :
            <ProjectCard project={project}
              onEdit={handleEdit}
              onDelete={onDelete}
              isDeleted={setDeleted} />
          }
        </div>
      ))}
      {isDeleted && <div 
      style={{position: 'fixed', bottom: 0, left: '40%', color: 'white',background: 'green', padding: '1rem', borderRadius: '100px'}}>
        Succesfull deleted {isDeleted}
        </div>}
    </div>
  );

}

export default ProjectList;
