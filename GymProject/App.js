import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen.js';
import ReserveScreen from './screens/ReserveScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PushNotification from "react-native-push-notification"; //added on 0910


const Tab = createBottomTabNavigator();
const createChannels = () => { //added on 0910
    PushNotification.createChannel(
        {
            channelId: '1',
            channelName: "Test Channel"
        }
    )
}

const App = () => {

  useEffect(()=>{
    createChannels();
  }, []); //added this on 0910

  const [logged, setLogged] = useState(false);
  const login = () => {
    setLogged(true);
  };
  const logout = () => {
    setLogged(false);
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarActiveTintColor: '#2B8E99',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: '#FFF8F3'},
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'medium', letterSpacing: 2.5},
          headerStyle: {
            backgroundColor: '#FFF8F3',
          },
        }}>
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen logged={logged} />}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            unmountOnBlur: true,
            headerTitle: 'HOME',
          }}
        />
        <Tab.Screen
          name="Reserve"
          children={() => <ReserveScreen logged={logged} />}
          options={{
            title: '예약하기',
            tabBarIcon: ({color, size}) => (
              <Icon name="access-time" color={color} size={size} />
            ),
            unmountOnBlur: true,
            headerTitle: 'RESERVE',
          }}
        />
        <Tab.Screen
          name="Login"
          children={() => (
            <LoginScreen logged={logged} handle1={login} handle2={logout} />
          )}
          options={{
            title: '계정관리',
            tabBarIcon: ({color, size}) => (
              <Icon name="account-circle" color={color} size={size} />
            ),
            headerTitle: 'ACCOUNT',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
