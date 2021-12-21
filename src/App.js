import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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

import {
  NavigationContainer,
  DefaultTheme as DefaultThemeNav,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import HomeScreen from './screens/ListItemScreen';
import Feather from 'react-native-vector-icons/Feather';
import AccountScreen from './screens/AccountScreen';
import Auth from '@react-native-firebase/auth';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};

const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    // primary: 'rgb(255, 45, 85)',
    background: '#fff',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name == 'create') {
            iconName = 'plus-circle';
          } else if (route.name == 'account') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return (
            <View style={styles.feathers}>
              <Feather name={iconName} color={color} size={36} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="home" component={HomeScreen} options={{title: ''}} />
      <Tab.Screen
        name="create"
        component={CreateAdScreen}
        options={{title: ''}}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{title: ''}}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(userExit => {
      if (userExit) {
        setUser(userExit);
      } else {
        setUser('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
        <View style={styles.container}>
          <Navigation />
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
  feathers: {
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 30,
  },
});

export default App;
