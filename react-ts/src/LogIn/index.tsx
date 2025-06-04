import { useContext, useState, type SyntheticEvent } from "react";
import {SessionApi} from '../Requests/SessionApi'
import {Session} from '../SessionContext'
import { Route } from "react-router";

export default function index (props) {
    const {user, setUser}: any = useContext(Session)

    const saveValues = (event: SyntheticEvent) => {
        const {name, value}:any = event.target as HTMLInputElement;

        setUser((old:any)=> {
            old[name] = value;
            return old;
        })
        
    }

    const setSession = () => {
        SessionApi.signIn(user)
        .then(res => {
            window.localStorage.session = res.token
            props.onChange(user)
        }).catch(console.log)
    }

    if (user._id)
        return <>{props.Children}</>
        
    return <Route path="/" element={<div>
            <div>
                <label htmlFor="">email</label>
                <input type="text" name="email" onChange={saveValues} />
            </div>
            <div>
                <label htmlFor="">password</label>
                <input type="password" name="password"  onChange={saveValues}/>
            </div>
            <button onClick={setSession}>SignIn</button>
        </div>}
    />
}