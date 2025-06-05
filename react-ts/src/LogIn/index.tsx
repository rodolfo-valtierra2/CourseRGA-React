import { Route, Routes } from "react-router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useContext } from "react";
import { Session } from "../SessionContext";

export default function index (props: any) {
    const [session, setSession]: any = useContext(Session)
    
    if (Object.keys(session).length)
        return <>{props.children}</>
        
    return <Routes>
        <Route path="/" element={<SignIn changeSession={setSession} session={session}/>}/>
        <Route path="/register" element={<SignUp changeSession={setSession} session={session}/>}/>
    </Routes>
}