import { View, Text } from 'react-native'
import React from 'react'
import { CompanyInfoProps } from './types'

export default function CompanyInfo({ route }: CompanyInfoProps) {
  const { name, catchPhrase, bs } = route.params || {}
  return (
    <View>
      <Text>Company name: {name}</Text>
      <Text>Catch phrase: {catchPhrase}</Text>
      <Text>BS: {bs}</Text>
    </View>
  )
}
