import React from 'react'
import { useRoute } from '@react-navigation/native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faFilm,
  faTicketSimple,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons'

import type { TMainBottomTabsParamList } from './types'
import {
  NowPlayingMoviesStackNavigator,
  PopularMoviesStackNavigator
} from './movie-list-stack'
const BottomTabs = createBottomTabNavigator<TMainBottomTabsParamList>()

const TabBarIcon: BottomTabNavigationOptions['tabBarIcon'] = ({ color }) => {
  const { name } = useRoute()
  const iconNameByRouteName: Record<
    keyof TMainBottomTabsParamList,
    IconDefinition
  > = {
    PopularMoviesStack: faFilm,
    NowPlayingMovesStack: faTicketSimple
  }

  return (
    <FontAwesomeIcon
      color={color}
      size={20}
      icon={iconNameByRouteName[name as keyof TMainBottomTabsParamList]}
    />
  )
}

export default function MainBottomTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarIcon: TabBarIcon,
        headerShown: false
      }}
    >
      <BottomTabs.Screen
        options={{ title: 'Popular Movies' }}
        name="PopularMoviesStack"
        component={PopularMoviesStackNavigator}
      />

      <BottomTabs.Screen
        options={{ title: 'Now Playing' }}
        name="NowPlayingMovesStack"
        component={NowPlayingMoviesStackNavigator}
      />
    </BottomTabs.Navigator>
  )
}
