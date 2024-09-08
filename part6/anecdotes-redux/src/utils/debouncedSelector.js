/* Custom debounced redux useSelector hook 
https://react.dev/learn/reusing-logic-with-custom-hooks
*/

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export const useDebouncedSelector = (selector, defaultState, delay) => {
  const [state, setState] = useState(defaultState)  // store debounced state update
  // Preserve timeouts between re-renders with refs
  const timeoutRef = useRef() 
  const selectorState = useSelector(selector)

  if (timeoutRef.current) {
    // clear existing timeout when selector is invoked
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [])

  if (delay === 0) {
    return selectorState
  }

  timeoutRef.current = setTimeout(() => {
    if (state !== selectorState) {
      setState(selectorState)
    }
  }, delay)

  return state
}