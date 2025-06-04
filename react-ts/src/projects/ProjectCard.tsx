import { Project } from '../utils/Project';
import {Link} from 'react-router'
import { projectAPI } from '../utils/ProjectAPI';

function formatDescription(description:string) {
  return description.substring(0, 60) + '...';
}

interface Props {
	project: Project;
	onEdit: (project:Project) => void;
  onDelete: (id:string | undefined) => void;
  isDeleted: (name:string) => void;
}

function ProjectCard (props: Props) {
    const {project, onEdit, onDelete, isDeleted} = props

    const handleEditClick = () => {
      onEdit(project);
    };

    const handleDelete = async () => {
      isDeleted(project.name)
      const deleted:any = await projectAPI.deleteById(project._id)
      if (deleted.ok){
        onDelete(project._id)
        setTimeout( () => 
          isDeleted('')
        , 1000);
      }
    }

    return <div className="card" style={{border: 'black 2px solid'}}>
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
