import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'

type Props = {
  children: number | string
  bgColor?: string
  style?: ViewStyle
}

export default function Badge({ children, bgColor = '#ccc', style }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  text: {
    color: '#fff'
  }
})
