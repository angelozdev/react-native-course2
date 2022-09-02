import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { SettingsScreen } from '../screens'
import { DrawerParamList } from '../screens/types'
import BottomTabsNavigator from './bottom-tabs-navigator'

const Drawer = createDrawerNavigator<DrawerParamList>()

function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
        options={{ title: 'User list' }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
