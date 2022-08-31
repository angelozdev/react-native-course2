import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { HomeScreen, Settings } from '../screens'
import { DrawerParamList } from '../screens/types'

const Drawer = createDrawerNavigator<DrawerParamList>()

function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
