import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'

import { Address, Company, User } from '../api/users.types'

export type RootStackParamList = {
  Home: undefined
  PostListByUser: { name: string; username: string; id: number }
  TopTabsUserInfo: User
}

export type DrawerParamList = {
  BottomTabsNavigator: NavigatorScreenParams<BottomTabsParamList>
  Settings: undefined
}

export type BottomTabsParamList = {
  StackNavigation: NavigatorScreenParams<RootStackParamList>
  PostList: undefined
}

export type TopTabsUserInfoParamList = {
  PersonalInfo: {
    username: string
    email: string
    website: string
    phone: string
    name: string
  }
  AddressInfo: Address
  CompanyInfo: Company
}

export type PersonalInfoProps = StackScreenProps<
  TopTabsUserInfoParamList,
  'PersonalInfo'
>

export type AddressInfoProps = StackScreenProps<
  TopTabsUserInfoParamList,
  'AddressInfo'
>
export type CompanyInfoProps = StackScreenProps<
  TopTabsUserInfoParamList,
  'CompanyInfo'
>

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>
export type PostsProps = StackScreenProps<RootStackParamList, 'PostListByUser'>
export type BottomsTabProps = BottomTabScreenProps<
  DrawerParamList,
  'BottomTabsNavigator'
>

export type TopTabsUserInfoProps = MaterialTopTabScreenProps<
  RootStackParamList,
  'TopTabsUserInfo'
>
