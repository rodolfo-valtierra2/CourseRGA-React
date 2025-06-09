import { NavLink } from "react-router"
import {useContext} from 'react'
import { Session } from "../SessionContext";

export default () => {
    const [session,]: any = useContext(Session)
    if(!session?.id) 
        return '';

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