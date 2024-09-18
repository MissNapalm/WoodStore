// App.js
import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8B4513', // SaddleBrown for buttons
    accent: '#A0522D', // Sienna for accents
    background: '#F5F5DC', // Beige for background
    text: '#4B2E19', // Dark brown text
    surface: '#DEB887', // Burlywood for surface
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
