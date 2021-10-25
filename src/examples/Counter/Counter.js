import React, { useState } from 'react'

export default function Counter () {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter(counter + 1)
  return <button onClick={increment}>{counter}</button>
}
