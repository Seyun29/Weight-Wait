import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen.js';
import ReserveScreen from './screens/ReserveScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack'; //I added this 8/1

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); //added this 8/1

const App = () => {
  const [logged, setLogged] = useState(false);
  const login = () => {
    setLogged(true);
  };
  const logout = () => {
    setLogged(false);
  };
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          children={() => (
            <LoginScreen logged={logged} handle1={login} handle2={logout} />
          )}
        />
        <Tab.Screen name="Home" children={() => <HomeScreen />} />
        <Tab.Screen name="Reserve" component={ReserveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  block1: {flex: 0.7, alignItems: 'center', justifyContent: 'center'},
  inputblock: {
    height: '6%',
    width: '90%',
    paddingHorizontal: 15,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    justifyContent: 'center',
  },
  text: {fontSize: 48, fontWeight: 'bold', color: 'black'},
  input: {fontSize: 20, paddingVertical: 8},
}); //수정예정

export default App;
