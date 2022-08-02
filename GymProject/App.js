import React from 'react';
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
//import ReserveScreen from './screens/ReserveScreen.js';
import ReserveScreen from './screens/NewReserveScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import LoginScreen from './screens/LoginScreen.js';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reserve" component={ReserveScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>

    /*
    <SafeAreaView style={{flex:1}}>
        <View style={{flex:1, alignItems : 'center'}}>
            <View style={styles.block1}>
                <Text style={styles.text}>Log In</Text>
            </View>
            <View style={styles.inputblock}>
                <TextInput placeholder="ID를 입력하세요." style={styles.input} />
            </View>
            <View style={{height:20}}/>
            <View style={styles.inputblock}>
                <TextInput placeholder="비밀번호를 입력하세요." style={styles.input} />
            </View>
            <View style={{height : 40, marginTop : 40, flexDirection : 'row'}}>
                <Button title="로그인" color='#bdbdbd'/>
                <View style={{width:'30%'}}/>
                <Button title="회원가입" color='#bdbdbd'/>
            </View>
            <View style={{height : 40, marginTop : 40, flexDirection : 'row', alignItems:'center'}}>
                <Text style={{fontSize:20,fontStyle:'italic'}}>관리자이신가요?</Text>
                <View style={{width : '15%'}}/>
                <Button title="관리자로 로그인"/>
            </View>
        </View>
    </SafeAreaView>
    */
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
