import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import { PostList } from '../screens'
import { BottomTabsParamList } from '../screens/types'
import { StackNavigation } from '.'

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>()

export default function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="user" size={25} />
          )
        }}
        name="StackNavigation"
        component={StackNavigation}
      />
      <BottomTabs.Screen
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="folder1" size={25} />
          )
        }}
        name="PostList"
        component={PostList}
      />
    </BottomTabs.Navigator>
  )
}
