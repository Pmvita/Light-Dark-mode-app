import React, { createContext, useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// Define the ThemeContext
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing theme
const useTheme = () => useContext(ThemeContext);

// App Component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

// HomeScreen Component
const HomeScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? '#f4f3f4' : '#f5dd4b'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
};

// Dynamic styles based on theme
const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    },
    text: {
      fontSize: 18,
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 20,
    },
  });

export default App;