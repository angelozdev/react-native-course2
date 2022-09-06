import { movieDBBaseQuery } from '@/lib'
import { IMovieDetails, MovieDBResult } from '@/types/movies'
import { createApi } from '@reduxjs/toolkit/query/react'

type TParams = Partial<{
  page: number
}>

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: movieDBBaseQuery,
  tagTypes: [
    'PopularMovies',
    'NowPlayingMovies',
    'MovieDetails',
    'TopRatedMovies'
  ],
  keepUnusedDataFor: 60 * 60 * 12, // 12 hours
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieDBResult, TParams>({
      query: ({ page = 1 } = {}) => ({
        method: 'GET',
        url: '/movie/popular',
        params: { page }
      }),
      providesTags: (_, _error, { page } = {}) => [
        { type: 'PopularMovies', id: page ?? 1 }
      ]
    }),
    getNowPlayingMovies: builder.query<MovieDBResult, void>({
      query: () => ({ method: 'GET', url: '/movie/now_playing' }),
      providesTags: () => [{ type: 'NowPlayingMovies', id: 'LIST' }]
    }),
    getMovieDetails: builder.query<IMovieDetails, number>({
      query: (id) => ({ method: 'GET', url: `/movie/${id}` }),
      providesTags: (result, error, id) => [{ type: 'MovieDetails', id }]
    }),
    getTopRatedMovies: builder.query<MovieDBResult, TParams>({
      query: ({ page = 1 }) => ({
        method: 'GET',
        url: '/movie/top_rated',
        params: { page }
      }),
      providesTags: (_response, _error, { page }) => [
        { type: 'TopRatedMovies', id: page ?? 1 }
      ]
    })
  })
})

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetTopRatedMoviesQuery
} = moviesApi
