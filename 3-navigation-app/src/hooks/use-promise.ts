import React from 'react'

interface IState<TData = unknown, TError = Error> {
  status: 'pending' | 'resolved' | 'rejected'
  data: TData | null
  error: TError | null
}

type TOptions = {
  initialData?: any | null
}

function usePromise<T = unknown, TError = Error>(
  promise: Promise<T> | (() => Promise<T>),
  { initialData = null }: TOptions = {}
) {
  const [state, setState] = React.useState<IState<T, TError>>({
    status: 'pending',
    data: initialData,
    error: null
  })

  React.useEffect(() => {
    const localPromise = typeof promise === 'function' ? promise() : promise

    localPromise.then(
      (data) => setState({ status: 'resolved', data, error: null }),
      (error: TError) => setState({ status: 'rejected', data: null, error })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ...state,
    isPending: state.status === 'pending',
    isResolved: state.status === 'resolved',
    isRejected: state.status === 'rejected'
  }
}

export default usePromise
