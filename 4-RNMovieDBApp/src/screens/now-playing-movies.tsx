import React from 'react'
import { useGetNowPlayingMoviesQuery } from '@/services/movies'
import { MovieList } from '@/components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TMovieListStackParamList } from '@/navigators/types'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieList'>

function PopularMovies({ navigation }: Props) {
  const { data, refetch, isFetching } = useGetNowPlayingMoviesQuery()

  return (
    <MovieList
      isFetching={isFetching}
      movieList={data?.results}
      refetch={refetch}
      onPressMovie={({ id, title }) => {
        navigation.navigate('MovieDetails', { title, id })
      }}
    />
  )
}

export default PopularMovies
