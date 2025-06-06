import { Route, Routes } from "react-router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useContext } from "react";
import { Session } from "../SessionContext";

export default function index (props: any) {
    const [session, ]: any = useContext(Session)
    
    if (Object.keys(session).length)
        return <Routes>
					{props.children}
				</Routes>
        
    return <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/register" element={<SignUp />}/>
    </Routes>
}
