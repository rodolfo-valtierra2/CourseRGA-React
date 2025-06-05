import {  type SyntheticEvent } from "react";
import { UserApi } from "../Requests/UserApi";
import { Link } from "react-router";


function SignIn ({changeSession, session}: any) {


    const saveValues = (event: SyntheticEvent) => {
        const {name, value}:any = event.target as HTMLInputElement;

        changeSession((old:any)=> {
            old[name] = value;
            return old;
        })
    }

    const onSubmit = () => {
        UserApi.signIn(session)
        .then(res => {
            window.localStorage.session = res.token
            changeSession(res)
        }).catch(console.log)
    }

    return <div>
        <div>
            <label htmlFor="">email</label>
            <input type="text" name="email" onChange={saveValues} />
        </div>
        <div>
            <label htmlFor="">password</label>
            <input type="password" name="password"  onChange={saveValues}/>
        </div>
        <button onClick={onSubmit}>Enter</button>
        <Link to="/register">Register new user</Link>
    </div>;
}

export default SignIn;