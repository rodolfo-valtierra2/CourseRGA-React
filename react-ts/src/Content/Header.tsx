import { useContext } from "react";
import { UserApi } from "../Requests/UserApi";
import { Session } from "../SessionContext";
import { useNavigate } from "react-router-dom";

export default function() {
    const Navigate = useNavigate()
    const [, setSession]:any = useContext(Session)

    const logOut = () => {
        const token = JSON.parse(window.localStorage.session);
        UserApi.logOut(token)
        .then(() => {
            window.localStorage.removeItem('session');
            setSession({})
            Navigate('/');
        });
    }

    return <header className="sticky">
        <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <button onClick={logOut} style={{float: 'right'}}>Log out</button>
    </header>;

}