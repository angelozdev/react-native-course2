import { moviesApi } from '@/services/movies'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddlewares = getDefaultMiddleware()
    return defaultMiddlewares.concat(moviesApi.middleware)
  }
})

export default store
