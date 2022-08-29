import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '../theme'

function useTheme() {
  const isDarkMode = useColorScheme() === 'dark'
  return { theme: isDarkMode ? darkTheme : lightTheme, isDarkMode }
}

export default useTheme
