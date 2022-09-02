import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  PostListByUser: { name: string; username: string; id: number }
}

export type DrawerParamList = {
  BottomTabsNavigator: undefined
  Settings: undefined
}

export type BottomTabsParamList = {
  StackNavigation: undefined
  PostList: undefined
}

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>
export type PostsProps = StackScreenProps<RootStackParamList, 'PostListByUser'>
export type BottomsTabProps = StackScreenProps<
  DrawerParamList,
  'BottomTabsNavigator'
>
