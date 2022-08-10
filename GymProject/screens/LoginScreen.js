/* import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';

const LoginScreen = () => {
  const [id, SetId] = useState('');
  const [pw, SetPw] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.block1}>
          <Text style={styles.text}>Log In</Text>
        </View>
        <View style={styles.inputblock}>
          <TextInput
            placeholder="ID를 입력하세요."
            style={styles.input}
            onChangeText={value => SetId(value)}
          />
        </View>
        <View style={{height: 20}} />
        <View style={styles.inputblock}>
          <TextInput
            placeholder="비밀번호를 입력하세요."
            style={styles.input}
            onChangeText={value => SetPw(value)}
            secureTextEntry
          />
        </View>
        <View style={{height: 40, marginTop: 40, flexDirection: 'row'}}>
          <Button title="로그인" color="#bdbdbd" />
          <View style={{width: '30%'}} />
          <Button title="회원가입" color="#bdbdbd" />
        </View>
        <View
          style={{
            height: 40,
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}></View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  block1: {flex: 0.7, alignItems: 'center', justifyContent: 'center'},
  inputblock: {
    height: '6%',
    width: '90%',
    paddingHorizontal: 15,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {fontSize: 48, fontWeight: 'bold', color: 'black'},
  input: {fontSize: 20, paddingVertical: 8},
}); //수정예정
export default LoginScreen; */

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  GoogleSignInAccount,
} from '@react-native-google-signin/google-signin';
import React, {useState, setState} from 'react';
import {View,Text,StatusBar,TouchableOpacity,StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'; //add this 8/8





GoogleSignin.configure({
  webClientId:
    '2931885723-73sv03pffs2m9v6l84p1t0bimha7nktt.apps.googleusercontent.com',
});

const LoginScreen = ({navigation}) => {
  // I changed from () to ({navigation}) 8/1 16:15
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setLoading(true);
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.idToken;
    const id = JSON.stringify(userInfo.user.id); // add this 8/8

    const storeuserid = async (value) => {
      try {
        await AsyncStorage.setItem('@storage_userid' , userInfo.user.id)
      } catch (e) {
        console.log('-1');
        // saving error
      }
    } // add this 8/8
    storeuserid() //add this 8/8
    const getuserid1 = async() => {
      try{
        const value = await AsyncStorage.getItem('@storage_userid');
        VA=value;
        console.log(value+"value");
      }
      catch(e){
        console.log('-2');
      }
    } //add this 8/8
    getuserid1(); //add this 8/8
  // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    
  // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    
    const accessToken = await (await GoogleSignin.getTokens()).accessToken;
    console.log(accessToken);
    console.log(userInfo.user.familyName);
    console.log(userInfo.user.id);
    fetch("https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/user", {
           method: 'POST',
           headers: {
           Accept: 'application/json',
     "Content-Type": 'application/json'
  },
  body: JSON.stringify({
    userid: userInfo.user.id,
    username: userInfo.user.familyName
  })
}); //add this 8/2
    navigation.navigate('Home',{userid:userInfo.user.id})  //add this line 8/1,,add {userid:--} 8/6
    setLoading(false)
  }; 
  /* const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }; */

      const googleSignout = async () => {
      auth().signOut().then( () => {
      GoogleSignin.revokeAccess(); //add this line 8/9
      console.log("User signout successfully!");

    }).catch(e => Alert.alert('Error',e.message));
  }   //동영상에서 하랬던 거

  const [id, SetId] = useState('');
  const [pw, SetPw] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dart-content'} />
      <TouchableOpacity style={styles.btn} onPress={googleSignIn}>
        <Text style={styles.font}>Google-Sign-In</Text>
      </TouchableOpacity>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={loading}
      />
      <TouchableOpacity style={styles.btn} onPress={googleSignout}>
        <Text style={styles.font}>Google-Sign-out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'blue',
  },
  text: {
    fontSize: 16,
  },
  font: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
