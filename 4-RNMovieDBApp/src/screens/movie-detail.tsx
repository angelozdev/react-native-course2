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
import { Badge } from '@/components'
import {
  getColorByVoteAverage,
  getIconByVoteAverage
} from '@/utils/movie.utils'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieDetails'>

export default function MovieDetailScreen({ route }: Props) {
  const { data, isLoading } = useGetMovieDetailsQuery(route.params.id)

  if (isLoading && typeof data === 'undefined') {
    return <ActivityIndicator />
  }

  const {
    title,
    release_date: releaseDate,
    overview,
    backdrop_path: backdropPath,
    vote_average: voteAverage,
    genres = []
  } = data || {}
  const backdropUrl = `https://image.tmdb.org/t/p/w500${backdropPath}`
  const releaseYear = new Date(releaseDate!).getFullYear()
  const badgeText = `${getIconByVoteAverage(voteAverage)}  ${voteAverage}`
  const badgeBgColor = getColorByVoteAverage(voteAverage)
  const genresText = genres.map((genre) => genre.name).join(', ')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Badge style={styles.badge} bgColor={badgeBgColor}>
        {badgeText}
      </Badge>
      <Image
        resizeMode="cover"
        accessibilityIgnoresInvertColors
        style={styles.image}
        source={{ uri: backdropUrl }}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          <Text>{title}</Text>
          <Text style={styles.releaseYear}> ({releaseYear})</Text>
        </Text>
        <Text style={[styles.overview, styles.text]}>{overview}</Text>

        {/* display genres */}
        {genresText && (
          <View style={styles.genresContainer}>
            <Text style={styles.text}>{genresText}</Text>
          </View>
        )}
        {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    position: 'relative'
  },
  contentContainer: {
    padding: 16
  },
  image: {
    aspectRatio: 21 / 9
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  releaseYear: {
    color: '#777',
    fontWeight: 'normal'
  },
  overview: {
    marginTop: 8
  },
  badge: {
    position: 'absolute',
    top: 16,
    zIndex: 1,
    right: 16
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16,
    color: '#444'
  },
  genresContainer: {
    marginTop: 8
  }
})
