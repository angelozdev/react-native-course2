import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import usersApi from '../api/users'
import { type HomeProps } from './types'
import { usePromise } from '../hooks'
import { UserItem } from '../components'
import { useToast } from 'react-native-toast-notifications'

export default function HomeScreen({ navigation }: HomeProps) {
  const toast = useToast()
  const { data, isPending, refetch, isRejected } = usePromise(usersApi.getAll, {
    keepPreviousData: true,
    onError: (error) => toast.show(error.message, { type: 'danger' })
  })

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        data={data}
        renderItem={({ item }) => {
          const { name, username, id } = item
          return (
            <UserItem
              goToPosts={() =>
                navigation.navigate('PostListByUser', { name, username, id })
              }
              goToUserInfo={() => {
                navigation.navigate('TopTabsUserInfo', item)
              }}
              username={username}
            />
          )
        }}
        keyExtractor={({ id }) => id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>Users</Text>}
        ListEmptyComponent={
          isPending ? null : (
            <View style={styles.contentContainer}>
              {isRejected ? (
                <Text>Something went wrong</Text>
              ) : (
                <Text>No users found</Text>
              )}
            </View>
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 18,
    flex: 1
  },
  list: {
    padding: 18,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
