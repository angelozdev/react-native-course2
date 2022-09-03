import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
  TopTabsUserInfoParamList,
  TopTabsUserInfoProps
} from '../screens/types'
import { PersonalInfo, AddressInfo, CompanyInfo } from '../screens'
import { StyleSheet } from 'react-native'

const TopTabs = createMaterialTopTabNavigator<TopTabsUserInfoParamList>()

export default function TopTabsUseInfo({ route }: TopTabsUserInfoProps) {
  const { address, name, username, phone, website, company } = route.params
  return (
    <TopTabs.Navigator sceneContainerStyle={styles.sceneContainer}>
      <TopTabs.Screen
        options={{ title: 'Personal' }}
        name="PersonalInfo"
        component={PersonalInfo}
        initialParams={{ name, username, phone, website }}
      />
      <TopTabs.Screen
        initialParams={address}
        name="AddressInfo"
        options={{ title: 'Address' }}
        component={AddressInfo}
      />
      <TopTabs.Screen
        initialParams={company}
        name="CompanyInfo"
        options={{ title: 'Company' }}
        component={CompanyInfo}
      />
    </TopTabs.Navigator>
  )
}

const styles = StyleSheet.create({
  sceneContainer: {
    padding: 18,
    backgroundColor: 'white',
    flex: 1
  }
})
