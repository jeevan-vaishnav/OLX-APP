import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import HomeScreen from './screens/ListItemScreen';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
        <View style={styles.container}>
          {/* <LoginScreen /> */}
          {/* <SignupScreen /> */}
          {/* <CreateAdScreen /> */}
          <HomeScreen />
        </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
