import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform
} from 'react-native'
import React from 'react'
import { Button } from '../features/ui'

const STEP = 10
export default function HomeScreen() {
  const [count, setCount] = React.useState(0)
  const { width } = useWindowDimensions()

  const increment = () => {
    setCount((prevCount) => {
      if (prevCount >= STEP * 5) return prevCount
      return prevCount + STEP
    })
  }
  const decrement = () => {
    if (count <= 0) return
    setCount((prevCount) => {
      const newCount = prevCount - STEP
      if (newCount < 0) return 0
      return newCount
    })
  }
  const reset = () => setCount(0)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Counter: {count}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.inlineButtons}>
          <Button
            style={{ marginRight: width * 0.01 }}
            disabled={count === STEP * 5}
            onPress={increment}
          >
            Increment
          </Button>
          <Button
            style={{ marginLeft: width * 0.01 }}
            disabled={count === 0}
            onPress={decrement}
          >
            Decrement
          </Button>
        </View>
        <Button
          style={{ marginTop: width * 0.02 }}
          disabled={count === 0}
          onPress={reset}
        >
          Reset
        </Button>
      </View>

      <Text>Platform: {Platform.OS}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  buttonsContainer: {
    marginVertical: 20
  },
  inlineButtons: {
    flexDirection: 'row'
  }
})
