import { movieDBBaseQuery } from '@/lib'
import { MovieDBResult } from '@/types/movies'
import { createApi } from '@reduxjs/toolkit/query/react'

export const popularMoviesApi = createApi({
  reducerPath: 'popularMoviesApi',
  baseQuery: movieDBBaseQuery,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieDBResult, void>({
      query: () => ({ method: 'GET', url: '/movie/popular' })
    })
  })
})

export const { useGetPopularMoviesQuery } = popularMoviesApi
