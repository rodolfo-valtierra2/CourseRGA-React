import { Project } from './Project';
import {Link} from 'react-router'
import { projectAPI } from './ProjectAPI';

function formatDescription(description:string) {
  return description.substring(0, 60) + '...';
}

interface Props {
	project: Project;
	onEdit: (project:Project) => void;
  onDelete: any;
}

function ProjectCard (props: Props) {
    const {project, onEdit, onDelete} = props

    const handleEditClick = () => {
      onEdit(project);
    };

    const handleDelete = () => {
      projectAPI.deleteById(project._id)
      .then (() => {
         onDelete(project._id)
      })
      .catch(console.log)

    }

    return <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
				<Link to={`/projects/${project._id}`}>
					<h5 className="strong">
						<strong>{project.name}</strong>
					</h5>
					<p>{formatDescription(project.description)}</p>
					<p>Budget : {project.budget.toLocaleString()}</p>
				</Link>
        <button className="bordered" onClick={handleEditClick}>
          <span className="icon-edit "></span>
          Edit
        </button>
        <button className="secondary" onClick={handleDelete}>
          X
        </button>

      </section>
    </div>
}

export default ProjectCard
