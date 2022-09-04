import { movieDBBaseQuery } from '@/lib'
import { IMovieDetails, MovieDBResult } from '@/types/movies'
import { createApi } from '@reduxjs/toolkit/query/react'

export const popularMoviesApi = createApi({
  reducerPath: 'popularMoviesApi',
  baseQuery: movieDBBaseQuery,
  tagTypes: ['PopularMovies', 'NowPlayingMovies', 'MovieDetails'],
  keepUnusedDataFor: 60 * 60 * 12,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieDBResult, void>({
      query: () => ({ method: 'GET', url: '/movie/popular' }),
      providesTags: () => [{ type: 'PopularMovies', id: 'LIST' }]
    }),
    getNowPlayingMovies: builder.query<MovieDBResult, void>({
      query: () => ({ method: 'GET', url: '/movie/now_playing' }),
      providesTags: () => [{ type: 'NowPlayingMovies', id: 'LIST' }]
    }),
    getMovieDetails: builder.query<IMovieDetails, number>({
      query: (id) => ({ method: 'GET', url: `/movie/${id}` }),
      providesTags: (result, error, id) => [{ type: 'MovieDetails', id }]
    })
  })
})

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieDetailsQuery
} = popularMoviesApi
