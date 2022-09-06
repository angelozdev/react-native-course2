import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  type PressableStateCallbackType
} from 'react-native'
import { Badge } from './badge'

import type { IMovie } from '@/types/movies'
import { getColorByVoteAverage } from '@/utils/movie.utils'

type Props = {
  overview: IMovie['overview']
  posterPath: IMovie['poster_path']
  title: IMovie['title']
  voteAverage: IMovie['vote_average']
  onPress?: () => void
}

function MovieCard({
  title,
  overview,
  posterPath,
  voteAverage,
  onPress
}: Props) {
  const badgeColor = getColorByVoteAverage(voteAverage)
  const urlImage = `https://image.tmdb.org/t/p/w500${posterPath}`
  const getContainerStyles = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    pressed && styles.isPressed
  ]

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={getContainerStyles}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Badge bgColor={badgeColor}>{voteAverage}</Badge>
      </View>
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image
            accessibilityIgnoresInvertColors
            style={styles.image}
            source={{ uri: urlImage }}
          />
        </View>
        <View style={styles.overview}>
          <Text numberOfLines={6} style={styles.overviewText}>
            {overview}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  isPressed: {
    opacity: 0.8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexGrow: 1,
    marginRight: 16
  },
  body: {
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'cover',
    aspectRatio: 2 / 3
  },
  overview: {
    flexGrow: 5,
    flex: 1,
    justifyContent: 'center'
  },
  overviewText: {},
  imageContainer: {
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexGrow: 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flex: 1
  }
})

export default React.memo(MovieCard)
