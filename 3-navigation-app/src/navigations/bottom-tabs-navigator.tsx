import React from 'react'
import { useRoute } from '@react-navigation/native'
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import { PostList } from '../screens'
import { BottomTabsParamList } from '../screens/types'
import { StackNavigation } from '.'

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>()

const iconsByRouteName: Record<keyof BottomTabsParamList, string> = {
  PostList: 'folder1',
  StackNavigation: 'user'
}

const TabBarIcon: BottomTabNavigationOptions['tabBarIcon'] = ({ color }) => {
  const { name } = useRoute()
  const iconName = iconsByRouteName[name as keyof BottomTabsParamList]
  return <Icon name={iconName} size={24} color={color} />
}

export default function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{ headerShown: false, tabBarIcon: TabBarIcon }}
    >
      <BottomTabs.Screen
        options={{ title: 'Users' }}
        name="StackNavigation"
        component={StackNavigation}
      />
      <BottomTabs.Screen
        options={{ title: 'Posts' }}
        name="PostList"
        component={PostList}
      />
    </BottomTabs.Navigator>
  )
}
