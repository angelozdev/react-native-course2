import React from 'react'

function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = React.useState(initialValue)
  const toggle = React.useCallback(
    () => setValue((prevValue) => !prevValue),
    []
  )
  return [value, toggle]
}

export default useToggle
