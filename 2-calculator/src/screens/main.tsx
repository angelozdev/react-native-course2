import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Dimensions
} from 'react-native'
import React from 'react'
import { useCalculator, useTheme } from '../hooks'
import { Button } from '../components'

const GAP = Dimensions.get('window').width * 0.02
const INTERNAL_GAP = GAP / 2

const buttons = [
  [
    {
      label: 'C',
      value: 'clear',
      description: 'Clear the screen'
    },
    {
      label: '+/-',
      value: 'toggle-sign',
      description: 'Change the sign of the number'
    },
    {
      label: '%',
      value: 'percent',
      description: 'Percentage of the number'
    },
    {
      label: '/',
      value: 'divide',
      description: 'Divide the number'
    }
  ],
  [
    {
      label: '7',
      value: 7
    },
    {
      label: '8',
      value: 8
    },
    {
      label: '9',
      value: 9
    },
    {
      label: '*',
      value: 'multiply',
      description: 'Multiply the number'
    }
  ],
  [
    {
      label: '4',
      value: 4
    },
    {
      label: '5',
      value: 5
    },
    {
      label: '6',
      value: 6
    },
    {
      label: '-',
      value: 'subtract',
      description: 'Subtract the number'
    }
  ],
  [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '+',
      value: 'add',
      description: 'Add the number'
    }
  ],
  [
    {
      label: '0',
      value: 0
    },
    {
      label: '.',
      value: 'decimal',
      description: 'Add a decimal point'
    },
    {
      label: '=',
      value: 'equals',
      description: 'Calculate the result'
    }
  ]
]

export default function MainScreen() {
  const { theme, isDarkMode } = useTheme()
  const { bg: backgroundColor, text: color } = theme.colors
  const { equaltionDisplay, handleClick, result } = useCalculator()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundColor}
        />

        <Text style={[styles.result, { color }]}>
          {result || equaltionDisplay || '0'}
        </Text>

        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonsRow}>
            {row.map(({ label, value, description }, index) => {
              const isLastInRow = index === row.length - 1
              const isFirstInRow = index === 0
              const isInternalButton = !isFirstInRow && !isLastInRow
              const isZeroButton = value === 0

              const style = [
                styles.button,
                isLastInRow && styles.rightButton,
                isFirstInRow && styles.leftButton,
                isInternalButton && styles.internalButton,
                isZeroButton && { flex: 2 }
              ]

              return (
                <Button
                  accessibilityLabel={description}
                  key={value}
                  style={style}
                  onPress={() => handleClick(value)}
                  accessibilityHint={description}
                >
                  <Text style={[styles.buttonText]}>{label}</Text>
                </Button>
              )
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: GAP,
    justifyContent: 'flex-end'
  },
  button: {
    flex: 1
  },
  rightButton: {
    marginLeft: INTERNAL_GAP
  },
  leftButton: {
    marginRight: INTERNAL_GAP
  },
  internalButton: {
    marginHorizontal: INTERNAL_GAP
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: INTERNAL_GAP * 2
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  result: {
    fontSize: 60,
    textAlign: 'right'
  }
})
