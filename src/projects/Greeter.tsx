import {createRoot} from 'react-dom/client'

function Greeter (props) {
    return <h1>Holle, {props.name}</h1>
}

const element = <Greeter/>

createRoot(document.getElementById("root")).render(element)