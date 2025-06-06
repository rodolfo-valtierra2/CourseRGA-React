import {  useContext, useState, type SyntheticEvent } from "react";
import { UserApi } from "../Requests/UserApi";
import { Link } from "react-router";
import { Session } from "../SessionContext";


function SignIn () {
	const [session, setSession] = useContext(Session);
	const [user, setUser] = useState({});
	const [error, setError] = useState('');

    const saveValues = (event: SyntheticEvent) => {
        const {name, value}:any = event.target as HTMLInputElement;

        setUser((old:any)=> {
            old[name] = value;
            return old;
        })
    }

    const onSubmit = () => UserApi.signIn(user)
        .then(res => {
					if(res && !res.error) {
            window.localStorage.session = res.accessToken;
            return setSession(res);
					}
					setError(res.message);
        }).catch(console.log)
    

    return <div>
				{ error && 
					<div>
						<mark className="secondary">{error}</mark>
					</div>

				}
        <div>
            <label htmlFor="email">email</label>
            <input type="text" name="email" onChange={saveValues} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password"  onChange={saveValues}/>
        </div>
        <button onClick={onSubmit}>Enter</button>
        <Link to="/register">Register</Link>
    </div>;
}

export default SignIn;
