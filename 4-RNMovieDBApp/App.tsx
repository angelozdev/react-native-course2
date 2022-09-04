import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { MainBottomTabs } from '@/navigators'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainBottomTabs />
      </NavigationContainer>
    </Provider>
  )
}
