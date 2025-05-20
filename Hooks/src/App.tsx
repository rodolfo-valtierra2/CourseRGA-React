import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  function handleClick () {
    setMessage('I\'m hele!')
  }



  return (
      <div className="container">
        <button onClick={handleClick}>Display</button>
        <p>{message}</p>
      </div>
  )
}

export default App
