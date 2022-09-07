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

import {
  useGetMovieCastQuery,
  useGetMovieDetailsQuery
} from '@/services/movies'
import type { TMovieListStackParamList } from '@/navigators/types'
import { Badge } from '@/components'
import { getColorByVoteAverage } from '@/utils/movie.utils'
import { Cast } from '@/types/movies'

type Props = NativeStackScreenProps<TMovieListStackParamList, 'MovieDetails'>

export default function MovieDetailScreen({ route }: Props) {
  const { id: movieId } = route.params
  const movieDetailQuery = useGetMovieDetailsQuery(movieId)
  const movieCastQuery = useGetMovieCastQuery(movieId)

  if (movieDetailQuery.isLoading && movieDetailQuery.data === undefined) {
    return <ActivityIndicator />
  }

  const {
    title,
    release_date: releaseDate,
    overview,
    backdrop_path: backdropPath,
    vote_average: voteAverage,
    genres = []
  } = movieDetailQuery.data || {}
  const backdropUrl = `https://image.tmdb.org/t/p/w500${backdropPath}`
  const releaseYear = new Date(releaseDate!).getFullYear()
  const badgeBgColor = getColorByVoteAverage(voteAverage)
  const genresText = genres.map((genre) => genre.name).join(', ')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {voteAverage && (
        <Badge style={styles.badge} bgColor={badgeBgColor}>
          {voteAverage}
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
          {movieCastQuery.data?.cast.map((item) => {
            if (!item.profile_path) return null
            return <CastItem key={item.id} {...item} />
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const CastItem = React.memo<Cast>(({ profile_path, name }) => {
  return (
    <View style={styles.castContainer}>
      <Image
        resizeMode="contain"
        style={styles.castImage}
        accessibilityIgnoresInvertColors
        source={{
          uri: `https://image.tmdb.org/t/p/w500${profile_path}`,
          width: 50,
          height: 50
        }}
      />
      <Text style={[styles.text, styles.castName]}>{name}</Text>
    </View>
  )
})

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
  section: {
    marginTop: 16
  },
  castContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  castName: {
    marginLeft: 8
  },
  castImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
})
