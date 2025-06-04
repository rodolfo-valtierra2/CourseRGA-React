import { NavLink } from "react-router"


export default ({session}:any) => {

    if(session?.id) <>
        <NavLink to="/" className="button rounded">
            SignIn
        </NavLink>
        <NavLink to="/signup" className="button rounded">
            SignUp
        </NavLink>
        </>

    return <>
        <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
            Projects
        </NavLink>
        <NavLink to="/NewProject" className="button rounded">
            New Project
        </NavLink>
    </>
}