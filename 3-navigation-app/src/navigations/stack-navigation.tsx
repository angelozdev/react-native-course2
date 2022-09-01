import React from 'react'
import { PostsScreen } from '../screens'
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions
} from '@react-navigation/stack'
import { RootStackParamList } from '../screens/types'
import DrawerNavigation from './drawer-navigation'

const Stack = createStackNavigator<RootStackParamList>()
const stackNavigationOptions: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyle: {
    backgroundColor: 'white',
    padding: 0
  },
  headerStyle: {
    borderBottomWidth: 1,
    elevation: 0,
    shadowOffset: { height: 0, width: 0 }
  },
  headerTitleAlign: 'center',
  headerBackTitle: '',
  gestureEnabled: true
}

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={stackNavigationOptions}
      initialRouteName="DrawerNavigator"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={({ route }) => {
          const { username } = route.params
          return { title: `${username}'s posts` }
        }}
        name="Posts"
        component={PostsScreen}
      />
    </Stack.Navigator>
  )
}
