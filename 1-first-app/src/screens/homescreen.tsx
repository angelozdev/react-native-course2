import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  TextInput
} from 'react-native'
import React from 'react'
import { Button } from '../features/ui'

export default function HomeScreen() {
  const [count, setCount] = React.useState(0)
  const [step, setStep] = React.useState(10)
  const { width } = useWindowDimensions()

  const increment = () => {
    setCount((prevCount) => {
      if (prevCount >= step * 5) return prevCount
      return prevCount + step
    })
  }
  const decrement = () => {
    if (count <= 0) return
    setCount((prevCount) => {
      const newCount = prevCount - step
      if (newCount < 0) return 0
      return newCount
    })
  }
  const reset = () => setCount(0)

  const handleStepChange = (text: string) => {
    const newStep = parseInt(text, 10)
    if (isNaN(newStep)) return setStep(10)
    setStep(newStep)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          keyboardType="number-pad"
          style={{ width: '100%' }}
          placeholder="Steps"
          accessibilityRole="search"
          onChangeText={handleStepChange}
        />
        <Text style={styles.title}>Counter: {count}</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.inlineButtons}>
            <Button
              style={{ marginRight: width * 0.01, width: '49%' }}
              disabled={count === step * 5}
              onPress={increment}
            >
              Increment
            </Button>
            <Button
              style={{ marginLeft: width * 0.01, width: '49%' }}
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
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    width: '100%',
    padding: 20
  }
})
