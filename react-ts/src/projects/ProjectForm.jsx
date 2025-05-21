import PropTypes from 'prop-types'
import { Project } from './Project';

function ProjectForm({onCancel, onSave}) {

    const onHandleSubmit = (event) => {
        event.preventDefault();
        onSave(new Project({name: 'Update Project'}));
    }

    return <form className="input-group vertical" onSubmit={onHandleSubmit}>
        <label for="name">Project Name</label>
        <input type="text" name="name" placeholder="enter name" />
        <label for="description">Project Description</label>

        <textarea name="description" placeholder="enter description"></textarea>
        <label for="budget">Project Budget</label>

        <input type="number" name="budget" placeholder="enter budget" />
        <label for="isActive">Active?</label>
        <input type="checkbox" name="isActive" />

        <div className="input-group">
            <button className="primary bordered medium">Save</button>
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
    onSave: PropTypes.func.isRequired
}

export default ProjectForm