import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native'
import React from 'react'
import MovieCard from '../movie-card'
import { IMovie } from '@/types/movies'

type Props = {
  movieList: IMovie[] | undefined | null
  isFetching: boolean
  refetch: () => void
  onPressMovie?: (movie: IMovie) => void
  onEndReached?: () => void
}

function Separator() {
  return <View style={styles.separator} />
}

export default function MovieList({
  isFetching,
  movieList,
  refetch,
  onPressMovie,
  onEndReached
}: Props) {
  const renderItem: ListRenderItem<IMovie> = ({ item }) => {
    const { title, poster_path, vote_average, overview } = item
    return (
      <MovieCard
        overview={overview}
        posterPath={poster_path}
        title={title}
        voteAverage={vote_average}
        onPress={() => onPressMovie?.(item)}
      />
    )
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      renderItem={renderItem}
      data={movieList}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={Separator}
      onEndReached={onEndReached}
      onEndReachedThreshold={5}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  }
})
