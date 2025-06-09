import { createContext, useState} from "react";

export const Session = createContext({});

export function Provider (props: any) {
    const [session, setSession] = useState({})
    
    return <Session.Provider value={[session, setSession]}>
            {props.children}
    </Session.Provider>

}