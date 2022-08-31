import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import usersApi from '../api/users'
import { type HomeProps } from './types'
import { usePromise } from '../hooks'
import { UserItem } from '../components'

export default function HomeScreen({ navigation }: HomeProps) {
  const { data, isPending, isResolved } = usePromise(usersApi.getAll)

  return (
    <View style={styles.container}>
      {isPending && <Text>Loading...</Text>}
      {isResolved && (
        <FlatList
          data={data?.data}
          renderItem={({ item: { name, username } }) => (
            <UserItem
              onClick={() =>
                navigation.navigate('Greeting', { name, username })
              }
              username={username}
            />
          )}
          keyExtractor={({ id }) => id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text>No users found</Text>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  list: {
    paddingBottom: 24
  }
})
