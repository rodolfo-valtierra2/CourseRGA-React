import { Project } from '../utils/Project';
import { useState } from 'react'
import type { SyntheticEvent } from 'react';
import { projectAPI } from '../utils/ProjectAPI';
import { useNavigate } from 'react-router';

function NewProject() {
    const navigate = useNavigate();
    const [project, setProject] = useState(new Project())
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    })

    const onSave = () => {
        projectAPI.post(project)
            .then(p =>p.json())
            .then(res => {
                if (res.message)
                    return groupErrors(res.message)
                return navigate('/projects/' + res._id)
            })
            .catch(e => console.log(e));
    }

    const groupErrors = (messages) => {
        const keys = Object.keys(errors)
        const errorsMessages = messages.reduce((acc, el: string) => {
            for (let k: string of keys) {
                if (el.includes(k)) {
                    acc[k] = el;
                    break;
                }
            }
            return acc;
        }, {})
        setErrors({ ...errors, ...errorsMessages });
    }

    const onHandleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave();
    }

    const addValues = (event: SyntheticEvent) => {
        const { value, checked, type, name } = event.target as HTMLInputElement
        let data = Number.parseInt(value) || value

        setProject((p: Project) => {
            p[name] = type == 'checkbox' ? checked : data;
            //setErrors(() => validate(p))
            return { ...p };
        })
    }

    // function validate(project: Project) {
    //     const errors: any = { name: '', description: '', budget: '' };

    //     if (project.name.length === 0) {
    //         errors.name = 'Name is required';
    //     }
    //     if (project.name.length > 0 && project.name.length < 3) {
    //         errors.name = 'Name needs to be at least 3 characters.';
    //     }
    //     if (project.description.length === 0) {
    //         errors.description = 'Description is required.';
    //     }
    //     if (project.budget == 0) {
    //         errors.budget = 'Budget must be more than $0.';
    //     }

    //     return errors;
    // }

    // function isValid() {
    //     return (
    //         errors.name.length === 0 &&
    //         errors.description.length === 0 &&
    //         errors.budget.length === 0
    //     );
    // }

    return <form style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyItems:'center', justifySelf:'center' }} onSubmit={onHandleSubmit}>
        <legend>Project</legend>
        <label htmlFor="name">Name</label>
        <input value={project.name} onChange={addValues} type="text" name="name" placeholder="enter name" />
        {errors.name && <mark className=" secondary ">
            {errors.name}
        </mark>
        }
        <label htmlFor="description">Description</label>
        <textarea rows="1" value={project.description} onChange={addValues} name="description" placeholder="enter description"></textarea>
        {errors.description && <p><mark className="secondary" >
            {errors.description}
        </mark></p>
        }
        <label htmlFor="budget">Budget</label>

        <input value={project.budget} onChange={addValues} type="number" name="budget" placeholder="enter budget" />
        {
            errors.budget && <mark className="secondary">
                {errors.budget}
            </mark>
        }
        <div>
        <label htmlFor="isActive">Active?</label>
        <input value={project.isActive} onChange={addValues} type="checkbox" name="isActive" />
        </div>
        <div>
        <input style={{width: '40%'}} className="primary bordered medium" type="submit" value="save" />
        </div>
    </form >;
}

export default NewProject
