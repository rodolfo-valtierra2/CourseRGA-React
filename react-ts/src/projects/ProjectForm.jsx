import PropTypes from 'prop-types'
import { Project } from './Project';
import {useState} from 'react'

function ProjectForm({onCancel, onSave, project: initialProject}) {
    const [project, setProject] = useState(initialProject)

    const onHandleSubmit = (event) => {
        event.preventDefault();
        onSave(project);
    }

    const addValues = ({target}) =>  setProject(p => {
        p[target.name] = target.type=='checkbox'?target.checked: target.value;
            
        return {...p};
    })

    return <form className="input-group vertical" onSubmit={onHandleSubmit}>
        <label for="name">Project Name</label>
        <input value={project.name} onChange={addValues} type="text" name="name" placeholder="enter name" />
        <label for="description">Project Description</label>

        <textarea value={project.description} onChange={addValues} name="description" placeholder="enter description"></textarea>
        <label for="budget">Project Budget</label>

        <input value={project.budget} onChange={addValues} type="number" name="budget" placeholder="enter budget" />
        <label for="isActive">Active?</label>
        <input value={project.isActive} onChange={addValues} type="checkbox" name="isActive" />

        <div className="input-group">
            <button className="primary bordered medium" onClick={onSave}>Save</button>
            <span></span>
            <button type="button" className="bordered medium"
                onClick={onCancel}>
                cancel
            </button>
        </div>
    </form>
}

ProjectForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    project: PropTypes.instanceOf(Project)
}

export default ProjectForm