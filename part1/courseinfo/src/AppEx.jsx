import { useState } from 'react'

const App = () => {
  /* When the state modifying function setCounter is called, 
  React re-renders the component which means that the function 
  body of the component function gets re-executed
  Note: The subsequent call to useState returns the new value
  of the state */
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  // console.log('rendering...', counter)

  return (
    <div>{counter}</div>
  )
}

export default App