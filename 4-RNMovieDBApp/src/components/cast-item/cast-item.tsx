import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import type { Cast } from '@/types/movies'

type Props = Cast

function CastItem({ name, profile_path, character }: Props) {
  const imageURL = `https://image.tmdb.org/t/p/w500${profile_path}`
  return (
    <View style={styles.constainer}>
      <Image
        resizeMode="cover"
        style={styles.image}
        accessibilityIgnoresInvertColors
        source={{
          uri: imageURL,
          height: 100
        }}
      />
      <View style={styles.body}>
        <Text style={[styles.text, styles.name]}>{name}</Text>
        <Text style={[styles.text]}>{character}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    marginLeft: 8,
    paddingRight: 16
  },
  name: {
    fontWeight: 'bold'
  },
  image: {
    aspectRatio: 2 / 3,
    borderRadius: 4
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16,
    color: '#444'
  },
  body: {
    marginLeft: 16,
    maxWidth: 200
  }
})

export default React.memo(CastItem)
