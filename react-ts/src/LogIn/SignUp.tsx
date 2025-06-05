import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router";



function SignUp () {
    const [user, setUser] = useState({})

    const addValues = (event: SyntheticEvent) => {
        const {name, value} = event.target as HTMLInputElement;

        setUser(old => {
            old[name] = value;
            return old;
        })
    }

    const onSubmit = () => {

    }

    return <div>
        <div>
            <label htmlFor="name">Name</label>
            <input name="name"/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input type="email" name="email" />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password"/>
        </div>
        <button>Register</button>
        <Link to="/">Cancel</Link>
    </div>
}

export default SignUp;