import { useContext, useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router";
import {UserApi} from '../Requests/UserApi'
import { Session } from "../SessionContext";

function SignUp () {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [, setSession]: any = useContext(Session);
    const Navigate = useNavigate();

    const addValues = (event: SyntheticEvent) => {
        const {name, value}: any = event.target as HTMLInputElement;

        setUser(old => {
            old[name] = value;
            return old;
        });
    }

    const onSubmit = () => {
        UserApi.register(user)
        .then(res => {
            console.log(res)
             if(res.ok || !res.error) {
                setSession(user);
                window.localStorage.token = res.accessToken;
                return Navigate("/");
            }
            setError(res.message)
        }).catch(console.log)
    }

    return <div className="container">
        { error && 
        <mark className="secondary ">
            <label htmlFor="">{error}</label>
        </mark>
        }
        <div>
            <label htmlFor="name">Name</label>
            <input name="name" onChange={addValues}/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input type="email" name="email" onChange={addValues} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password" onChange={addValues}/>
        </div>
        <button className="primary" onClick={onSubmit}>Register</button>
        <Link to="/">Cancel</Link>
    </div>
}

export default SignUp;