
interface Props {
	name: string
}
function Greeter (props:Props) {
    return <h1>Holle, {props.name}</h1>
}

const Element = <Greeter name={"juan"}/>
export default Element;

