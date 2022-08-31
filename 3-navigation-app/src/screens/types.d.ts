import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  DrawerNavigator: undefined
  Greeting: { name: string; username: string }
}

export type DrawerParamList = {
  Home: undefined
  Settings: undefined
}

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>
export type GreetingProps = StackScreenProps<RootStackParamList, 'Greeting'>
