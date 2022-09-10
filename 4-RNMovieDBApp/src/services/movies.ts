import { movieDBBaseQuery } from '@/lib'
import { ICast, IMovieDetails, MovieDBResult } from '@/types/movies'
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
    'TopRatedMovies',
    'MovieCast'
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
    getNowPlayingMovies: builder.query<MovieDBResult, TParams>({
      query: ({ page }) => ({
        method: 'GET',
        url: '/movie/now_playing',
        params: { page }
      }),
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
    }),
    getMovieCast: builder.query<ICast, number>({
      query: (id) => ({ method: 'GET', url: `/movie/${id}/credits` }),
      providesTags: (result, error, id) => [{ type: 'MovieCast', id }]
    })
  })
})

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieCastQuery
} = moviesApi
