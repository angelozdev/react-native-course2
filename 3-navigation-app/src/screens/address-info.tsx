import { View, Text } from 'react-native'
import React from 'react'
import { AddressInfoProps } from './types'

export default function AddressInfo({ route }: AddressInfoProps) {
  const { street, city, suite, zipcode } = route.params || {}
  return (
    <View>
      <Text>AddressInfo</Text>
      <Text>Street: {street}</Text>
      <Text>Suite: {suite}</Text>
      <Text>City: {city}</Text>
      <Text>Zipcode: {zipcode}</Text>
    </View>
  )
}
