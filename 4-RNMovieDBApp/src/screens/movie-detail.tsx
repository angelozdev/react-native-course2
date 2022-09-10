import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  useGetMovieCastQuery,
  useGetMovieDetailsQuery
} from '@/services/movies'
import type { TMovieListStackParamList } from '@/navigators/types'
import { Badge, CastItem } from '@/components'
import { getColorByVoteAverage } from '@/utils/movie.utils'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieDetails'>

export default function MovieDetailScreen({ route }: Props) {
  const { id: movieId } = route.params
  const movieDetailQuery = useGetMovieDetailsQuery(movieId)
  const movieCastQuery = useGetMovieCastQuery(movieId)

  if (movieDetailQuery.isLoading) {
    return <ActivityIndicator style={styles.activeIndicator} />
  }

  const {
    title,
    release_date: releaseDate,
    overview,
    backdrop_path: backdropPath,
    vote_average: voteAverage,
    genres = []
  } = movieDetailQuery.data || {}

  const { cast = [] } = movieCastQuery.data || {}
  const backdropUrl = `https://image.tmdb.org/t/p/w500${backdropPath}`
  const releaseYear = new Date(releaseDate!).getFullYear()
  const badgeBgColor = getColorByVoteAverage(voteAverage)
  const genresText = genres.map((genre) => genre.name).join(', ')
  const firstTenCast = cast.slice(0, 10)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {voteAverage && (
        <Badge style={styles.badge} bgColor={badgeBgColor}>
          <View style={styles.badgeContent}>
            <FontAwesomeIcon color="white" icon={faStar} />
            <Text style={styles.badgeText}>{voteAverage}</Text>
          </View>
        </Badge>
      )}
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

        {genresText && (
          <View style={styles.section}>
            <Text style={styles.text}>{genresText}</Text>
          </View>
        )}

        <View style={styles.section}>
          {movieCastQuery.isLoading && <ActivityIndicator />}
          <FlatList
            horizontal
            keyExtractor={({ id }) => id.toString()}
            data={firstTenCast}
            renderItem={({ item }) => <CastItem {...item} />}
          />
        </View>
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
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16,
    color: '#444'
  },
  section: {
    marginTop: 16
  },
  activeIndicator: {
    marginTop: 16
  }
})
