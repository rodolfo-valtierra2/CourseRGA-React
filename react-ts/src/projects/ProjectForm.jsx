
function ProjectForm() {
    return <form className="input-group vertical">
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
            <button type="button" className="bordered medium">cancel</button>
        </div>
    </form>
}

export default ProjectForm