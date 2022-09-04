import { popularMoviesApi } from '@/services/movies'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [popularMoviesApi.reducerPath]: popularMoviesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddlewares = getDefaultMiddleware()
    return defaultMiddlewares.concat(popularMoviesApi.middleware)
  }
})

store.subscribe(() => {
  // console.log(store.getState())
})

export default store
