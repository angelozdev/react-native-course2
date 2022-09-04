import React from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useGetMovieDetailsQuery } from '@/services/movies'
import type { TMovieListStackParamList } from '@/navigators/types'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieDetails'>

export default function MovieDetailScreen({ route }: Props) {
  const { data, isLoading } = useGetMovieDetailsQuery(route.params.id)
  const { backdrop_path } = data || {}
  const backdropUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        style={styles.image}
        source={{ uri: backdropUrl }}
      />

      <View style={styles.contentContainer}>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  contentContainer: {
    padding: 20
  },
  image: {
    aspectRatio: 16 / 9
  }
})
