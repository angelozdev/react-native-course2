import { View, Text } from 'react-native'
import React from 'react'
import { GreetingProps } from './types'

export default function GreetingScreen({ route }: GreetingProps) {
  const { name } = route.params
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  )
}
