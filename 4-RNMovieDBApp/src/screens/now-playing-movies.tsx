import React from 'react'
import { useGetNowPlayingMoviesQuery } from '@/services/movies'
import { MovieList } from '@/components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TMovieListStackParamList } from '@/navigators/types'
import { useAccumulateData } from '@/hooks'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieList'>

function PopularMovies({ navigation }: Props) {
  const [page, setPage] = React.useState(1)
  const { data, refetch, isFetching } = useGetNowPlayingMoviesQuery({ page })
  const [movieList, { reset }] = useAccumulateData(data?.results)

  const handleEndReached = () => {
    if (data?.total_pages && page < data.total_pages) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleRefresh = () => {
    setPage((prevPage) => {
      if (prevPage > 1) reset()
      refetch()
      return 1
    })
  }

  return (
    <MovieList
      isFetching={isFetching}
      movieList={movieList}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onPressMovie={({ id, title }) => {
        navigation.navigate('MovieDetails', { title, id })
      }}
    />
  )
}

export default PopularMovies
