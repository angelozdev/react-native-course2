import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { MOVIE_DB_ACCESS_TOKEN } from '@env'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

type TAxiosBaseQueryArgs = {
  baseURL: AxiosRequestConfig['baseURL']
  headers?: AxiosRequestConfig['headers']
}

export const axiosBaseQuery =
  ({
    baseURL = '/',
    headers
  }: TAxiosBaseQueryArgs): BaseQueryFn<AxiosRequestConfig> =>
  async (config) => {
    try {
      console.log('Fetching from: ', baseURL + config.url)
      const result = await axios(Object.assign(config, { baseURL, headers }))
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export const movieDBBaseQuery = axiosBaseQuery({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${MOVIE_DB_ACCESS_TOKEN}`
  }
})
