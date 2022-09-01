import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  DrawerNavigator: undefined
  Posts: { name: string; username: string; id: number }
}

export type DrawerParamList = {
  Home: undefined
  Settings: undefined
}

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>
export type PostsProps = StackScreenProps<RootStackParamList, 'Posts'>
