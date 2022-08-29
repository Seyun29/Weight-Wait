import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  GoogleSignInAccount,
} from '@react-native-google-signin/google-signin';
import React, {useState, setState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
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

    const storeuserid = async value => {
      try {
        await AsyncStorage.setItem('@storage_userid', userInfo.user.id);
      } catch (e) {
        console.log('-1');
        // saving error
      }
    }; // add this 8/8
    storeuserid(); //add this 8/8

    const storeusername = async value => {
      try {
        await AsyncStorage.setItem('@storage_username', userInfo.user.name);
      } catch (e) {
        console.log('-3');
      }
    };

    storeusername();

    const getuserid1 = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_userid');
        console.log(value + 'value');
      } catch (e) {
        console.log('-2');
      }
    }; //add this 8/8
    getuserid1(); //add this 8/8
    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);

    const accessToken = await (await GoogleSignin.getTokens()).accessToken;
    console.log(accessToken);
    console.log(userInfo.user.familyName);
    console.log(userInfo.user.id);
    fetch(
      'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/user',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userInfo.user.id,
          username: userInfo.user.familyName,
        }),
      },
    ); //add this 8/2
    navigation.navigate('Home', {userid: userInfo.user.id}); //add this line 8/1,,add {userid:--} 8/6
    setLoading(false);
  };

  const googleSignout = async () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess(); //add this line 8/9
        console.log('User signout successfully!');
      })
      .catch(e => Alert.alert('Error', e.message));
  }; //동영상에서 하랬던 거

  const [id, SetId] = useState('');
  const [pw, SetPw] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dart-content'} />
      <TouchableOpacity style={styles.btn} onPress={googleSignIn}>
        <Text style={styles.font}>Google-Sign-In</Text>
      </TouchableOpacity>
      <View style={{flex: 0.1}} />
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
