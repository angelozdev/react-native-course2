import React from 'react'

type TReturn<T> = [
  T[],
  {
    reset: () => void
    setAccumulatedData: React.Dispatch<React.SetStateAction<T[]>>
  }
]

function useAccumulateData<T>(data?: T[]): TReturn<T> {
  const [accumulatedData, setAccumulatedData] = React.useState<T[]>(data || [])

  const reset = React.useCallback(() => {
    setAccumulatedData([])
  }, [])

  React.useEffect(() => {
    if (data) setAccumulatedData((prevData) => [...prevData, ...data])
  }, [data])

  return [accumulatedData, { reset, setAccumulatedData }]
}

export default useAccumulateData
