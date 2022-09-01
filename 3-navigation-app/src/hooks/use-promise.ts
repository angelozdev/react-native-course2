import React from 'react'

interface IState<TData = unknown, TError = Error> {
  status: 'pending' | 'resolved' | 'rejected' | 'idle'
  data: TData | null
  error: TError | null
}

type TOptions = {
  initialData?: any | null
  enabled?: boolean
  keepPreviousData?: boolean
}

function usePromise<T = unknown, TError = Error>(
  exec: () => Promise<T>,
  options: TOptions = {}
) {
  const {
    initialData = null,
    enabled = true,
    keepPreviousData = false
  } = options
  const [state, setState] = React.useState<IState<T, TError>>({
    status: 'idle',
    data: initialData,
    error: null
  })

  const fetch = React.useCallback(() => {
    setState(({ data }) => ({
      status: 'pending',
      data: keepPreviousData ? data : null,
      error: null
    }))
    exec().then(
      (data) => setState({ status: 'resolved', data, error: null }),
      (error: TError) => setState({ status: 'rejected', data: null, error })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (enabled) fetch()
  }, [enabled, fetch])

  return {
    ...state,
    isPending: state.status === 'pending',
    isResolved: state.status === 'resolved',
    isRejected: state.status === 'rejected',
    isIdle: state.status === 'idle',
    refetch: fetch
  }
}

export default usePromise
