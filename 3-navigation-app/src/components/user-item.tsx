import { Text, StyleSheet, View, Button, Pressable } from 'react-native'
import React from 'react'
import { darken } from 'polished'

interface UserItemProps {
  goToPosts: () => void
  goToUserInfo: () => void
  username: string
}

export default function UserItem({
  goToPosts,
  username,
  goToUserInfo
}: UserItemProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={goToUserInfo}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.titleContainer,
          pressed && styles.pressed
        ]}
      >
        <Text style={styles.title}>{username}</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Button title="Go to posts" onPress={goToPosts} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0
  },
  pressed: {
    backgroundColor: darken(0.02, '#fff')
  },
  titleContainer: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 14,
    fontWeight: '600'
  }
})
