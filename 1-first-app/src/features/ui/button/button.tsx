import {
  Text,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  ViewStyle
} from 'react-native'
import React from 'react'
import styles from './styles'

type NativeProps = Omit<
  PressableProps,
  'children' | 'accessibilityRole' | 'style'
>
type Props = NativeProps & {
  children: string
  style?: ViewStyle
}

function Button({ children, style, ...props }: Props) {
  const { disabled } = props
  const getButtonStyles = ({ pressed }: PressableStateCallbackType) => [
    styles.button,
    pressed && styles.isPressed,
    disabled && styles.isDisabled,
    { ...(style || {}) }
  ]

  return (
    <Pressable style={getButtonStyles} accessibilityRole="button" {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default Button
