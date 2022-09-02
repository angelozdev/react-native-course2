import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'
import { DrawerNavigator } from './src/navigations'

export default function App() {
  const onReady = () => {
    RNBootSplash.hide()
  }

  return (
    <NavigationContainer onReady={onReady}>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
