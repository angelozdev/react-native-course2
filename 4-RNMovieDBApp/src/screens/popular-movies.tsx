import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native'
import React from 'react'
import { useGetPopularMoviesQuery } from '@/services/movies'
import { MovieCard } from '@/components'

export default function PopularMovies() {
  const { data, refetch, isFetching } = useGetPopularMoviesQuery()

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <MovieCard {...item} />}
        data={data?.results}
        keyExtractor={({ id }) => String(id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  separator: {
    height: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 24
  },
  contentContainer: {
    padding: 16
  }
})
