import PropTypes from 'prop-types'
import { Project } from './Project';
import { useState } from 'react'

function ProjectForm({ onCancel, onSave, project: initialProject }) {
    const [project, setProject] = useState(initialProject)
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    })

    const onHandleSubmit = (event) => {
        event.preventDefault();
        if (isValid()) onSave(project);
    }

    const addValues = ({ target }) => {
        setProject(p => {
            p[target.name] = target.type == 'checkbox' ? target.checked : target.value;
            setErrors(() => validate(p))
            return { ...p };
        })
    }

    function validate(project) {
        let errors = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget == 0) {
            errors.budget = 'Budget must be more than $0.';
        }

        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    return <form className="input-group vertical" onSubmit={onHandleSubmit}>
        <label for="name">Project Name</label>
        <input value={project.name} onChange={addValues} type="text" name="name" placeholder="enter name" />
        {errors.name && <div className="card error">
            <p>{errors.name}</p>
            </div>
        }
        <label for="description">Project Description</label>

        <textarea value={project.description} onChange={addValues} name="description" placeholder="enter description"></textarea>
        {errors.description && <div className="card error">
            <p>{errors.description}</p>
            </div>
        }
        <label for="budget">Project Budget</label>

        <input value={project.budget} onChange={addValues} type="number" name="budget" placeholder="enter budget" />
        {errors.budget && <div className="card error">
            <p>{errors.budget}</p>
            </div>
        }
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