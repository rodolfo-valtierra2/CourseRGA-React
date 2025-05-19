

function Greeter (props) {
    return <h1>Holle, {props.name}</h1>
}

Greeter.propTypes  = {
    name: PropTypes.string.isRequired,
}
const Element = <Greeter name={1}/>
export default Element;

