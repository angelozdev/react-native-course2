import React from 'react'

function useAccumulateData<T>(data?: T[]) {
  const [accumulatedData, setAccumulatedData] = React.useState<T[]>(data || [])

  React.useEffect(() => {
    if (data) setAccumulatedData((prevData) => [...prevData, ...data])
  }, [data])

  return accumulatedData
}

export default useAccumulateData
