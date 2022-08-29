import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  ViewStyle
} from 'react-native'
import React from 'react'
import { useTheme } from '../../hooks'
import { commonTheme } from '../../theme'

type NativeProps = Omit<PressableProps, 'accessibilityRole' | 'style'>
type Props = NativeProps & {
  style?: StyleProp<ViewStyle>
  rounded?: boolean
}
type TGetButtonStyle = (
  options: PressableStateCallbackType
) => StyleProp<ViewStyle>

export default function Button({ children, style, rounded, ...props }: Props) {
  const { theme } = useTheme()

  const getButtonStyle: TGetButtonStyle = ({ pressed }) => {
    const { disabled } = props
    return [
      styles.button,
      style,
      pressed && styles.isPressed,
      disabled && styles.isDisabled,
      rounded && styles.isRounded
    ]
  }

  const textStyle = [styles.text, { color: theme.colors.text }]

  return (
    <Pressable style={getButtonStyle} accessibilityRole="button" {...props}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: commonTheme.colors.storm,
    shadowColor: commonTheme.colors.storm,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  text: {
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  isPressed: {
    backgroundColor: commonTheme.colors.stormLight,
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 1
  },
  isDisabled: {
    opacity: 0.6
  },
  isRounded: {
    borderRadius: 50
  }
})
