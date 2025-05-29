import type { Project } from '../utils/Project';
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject)
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    })

    const onHandleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (isValid()) onSave(project);
    }

    const addValues = (event: SyntheticEvent) => {
        let { name, value, checked, type } = event.target as HTMLInputElement
				value = Number.parseInt(value) || value

        setProject((p: Project) => {
            p[name] = type == 'checkbox' ? checked : value;
            setErrors(() => validate(p))
            return { ...p };
        })
    }

    function validate(project: Project) {
        const errors: any = { name: '', description: '', budget: '' };

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
        <label htmlFor="name">Project Name</label>
        <input value={project.name} onChange={addValues} type="text" name="name" placeholder="enter name" />
        {errors.name && <div className="card error">
            <p>{errors.name}</p>
        </div>
        }
        <label htmlFor="description">Project Description</label>

        <textarea value={project.description} onChange={addValues} name="description" placeholder="enter description"></textarea>
        {errors.description && <div className="card error">
            <p>{errors.description}</p>
        </div>
        }
        <label htmlFor="budget">Project Budget</label>

        <input value={project.budget} onChange={addValues} type="number" name="budget" placeholder="enter budget" />
        {errors.budget && <div className="card error">
            <p>{errors.budget}</p>
        </div>
        }
        <label htmlFor="isActive">Active?</label>
        <input value={project.isActive} onChange={addValues} type="checkbox" name="isActive" />

        <div className="input-group">
            <button className="primary bordered medium" onClick={onSave}>Save</button>
            <span></span>
            <button type="button" className="bordered medium"
                onClick={onCancel}>
                cancel
            </button>
        </div>
    </form>;
}

export default ProjectForm
