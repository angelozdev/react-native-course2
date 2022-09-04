import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Movie } from '@/types/movies'

type Props = Movie

function getColorByVoteAverage(voteAverage: number) {
  if (voteAverage >= 7) {
    return '#4caf50'
  }
  if (voteAverage >= 5) {
    return '#ff9800'
  }
  return '#f44336'
}

function MovieCard({ title, overview, poster_path, vote_average }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.container, pressed && styles.isPressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.badge,
            { backgroundColor: getColorByVoteAverage(vote_average) }
          ]}
        >
          {vote_average}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image
            accessibilityIgnoresInvertColors
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
              width: 100,
              height: 160
            }}
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
    flex: 1
  },
  isPressed: {
    opacity: 0.8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  body: {
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'cover',
    width: '100%'
  },
  overview: {
    flexGrow: 2,
    flex: 1,
    justifyContent: 'center'
  },
  overviewText: {},
  imageContainer: {
    flexGrow: 1,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  badge: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
    color: '#fff'
  }
})

export default React.memo(MovieCard)
