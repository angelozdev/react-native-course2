import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity
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

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

function MovieCard({
  title,
  overview,
  posterPath,
  voteAverage,
  onPress
}: Props) {
  const scale = React.useRef(new Animated.Value(1)).current
  const badgeColor = getColorByVoteAverage(voteAverage)
  const urlImage = `https://image.tmdb.org/t/p/w500${posterPath}`

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start()
  }

  return (
    <AnimatedTouchable
      accessibilityRole="button"
      activeOpacity={0.8}
      onLongPress={handlePressOut}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, { transform: [{ scale }] }]}
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
          <Text numberOfLines={6}>{overview}</Text>
        </View>
      </View>
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
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
