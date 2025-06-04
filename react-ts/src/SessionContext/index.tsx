import { Children, createContext} from "react";

export const Session = createContext({});

export const Provider = (props: any) => {

    return <Session.Provider {...props.value}>
        {props.Children}
    </Session.Provider>

}