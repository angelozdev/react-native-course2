import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import usersApi from '../api/users'
import { type HomeProps } from './types'
import { usePromise } from '../hooks'
import { UserItem } from '../components'

export default function HomeScreen({ navigation }: HomeProps) {
  const { data, isPending, refetch } = usePromise(usersApi.getAll, {
    keepPreviousData: true
  })

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        data={data}
        renderItem={({ item: { name, username, id } }) => (
          <UserItem
            onClick={() =>
              navigation.navigate('PostListByUser', { name, username, id })
            }
            username={username}
          />
        )}
        keyExtractor={({ id }) => id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>Users</Text>}
        ListEmptyComponent={
          isPending ? null : (
            <View style={styles.contentContainer}>
              <Text>No users found</Text>
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
