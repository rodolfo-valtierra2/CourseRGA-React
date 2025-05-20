import { useState, useEffect } from 'react'

function Button({ onClickFunction }) {
  return <button onClick={onClickFunction}>+1</button>;
}

const Result = ({ value }) => {
  return <div>Result: {value}</div>;
};

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  return (
    <div>
      <Button onClickFunction={incrementCounter} />
      <Result value={counter} />
    </div>
  );
}

export default App
