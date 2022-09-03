import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { PersonalInfoProps } from './types'

export default function PersonalInfo({ route }: PersonalInfoProps) {
  const { name, username, email, phone, website } = route.params
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          accessibilityIgnoresInvertColors
          source={{
            uri: 'https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png',
            height: 100,
            width: 100
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{name}</Text>
      </View>

      <View>
        <Text>Username: {username}</Text>
        <Text>Email: {email}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Website: {website}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  }
})
