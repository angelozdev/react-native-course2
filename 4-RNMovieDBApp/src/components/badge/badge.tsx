import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
  children: number | string
  bgColor?: string
}

export default function Badge({ children, bgColor = '#ccc' }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8
  },
  text: {
    color: '#fff'
  }
})
