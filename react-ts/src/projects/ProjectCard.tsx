import { Project } from './Project';
import {Link} from 'react-router'
import { projectAPI } from './ProjectAPI';

function formatDescription(description:string) {
  return description.substring(0, 60) + '...';
}

interface Props {
	project: Project;
	onEdit: (project:Project) => void;
}

function ProjectCard (props: Props) {
    const {project, onEdit} = props

    const handleEditClick = (projectBeingEdited:Project) => {
      onEdit(projectBeingEdited);
    };

    const handleDelete = () => {
      projectAPI.
    }

    return <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
				<Link to={`/projects/${project.id}`}>
					<h5 className="strong">
						<strong>{project.name}</strong>
					</h5>
					<p>{formatDescription(project.description)}</p>
					<p>Budget : {project.budget.toLocaleString()}</p>
				</Link>
        <button className="bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit "></span>
          Edit
        </button>
        <button className="secondary" onClick={() => handleEditClick(project)}>
          X
        </button>

      </section>
    </div>
}

export default ProjectCard
