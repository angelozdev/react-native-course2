import 'react-native-gesture-handler'
import React from 'react'
import RNBootSplash from 'react-native-bootsplash'
import { NavigationContainer } from '@react-navigation/native'
import { ToastProvider } from 'react-native-toast-notifications'
import Icon from 'react-native-vector-icons/AntDesign'

import { DrawerNavigator } from './src/navigations'

export default function App() {
  const onReady = () => {
    RNBootSplash.hide()
  }

  return (
    <ToastProvider
      dangerIcon={<Icon name="closecircleo" color="white" />}
      offsetTop={50}
      placement="top"
      type="danger"
    >
      <NavigationContainer onReady={onReady}>
        <DrawerNavigator />
      </NavigationContainer>
    </ToastProvider>
  )
}
