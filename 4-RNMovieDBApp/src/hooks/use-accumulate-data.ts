import React from 'react'

type TReturn<T> = [
  T[],
  {
    reset: () => void
  }
]

type TOptions<T> = {
  key?: keyof T
  filterDuplicatesByKey?: boolean
}

function useAccumulateData<T extends Object>(
  data?: T[],
  options?: TOptions<T>
): TReturn<T> {
  const { key = 'id', filterDuplicatesByKey = true } = options || {}
  const keys = React.useRef<Set<typeof key>>(new Set([]))
  const [accumulatedData, setAccumulatedData] = React.useState<T[]>(data || [])

  const reset = React.useCallback(() => {
    keys.current = new Set([])
    setAccumulatedData([])
  }, [])

  React.useEffect(() => {
    if (!data) return
    if (!Array.isArray(data)) return

    setAccumulatedData((prevData) => {
      const newData = data.filter((item) => {
        const keyValue = item[key as keyof T] as typeof key
        if (!keyValue) true
        if (filterDuplicatesByKey && keys.current.has(keyValue)) return false
        keys.current.add(keyValue)
        return true
      })
      return [...prevData, ...newData]
    })
  }, [data, key, filterDuplicatesByKey])

  return [accumulatedData, { reset }]
}

export default useAccumulateData
