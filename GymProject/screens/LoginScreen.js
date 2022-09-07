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
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; //add this 8/8
import {useNavigation} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '2931885723-73sv03pffs2m9v6l84p1t0bimha7nktt.apps.googleusercontent.com',
});

const LoginScreen = ({logged, handle1, handle2}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const login = () => {
    handle1();
  };
  const logout = () => {
    handle2();
  };
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
    login();
    //navigation.navigate('Home', {userid: userInfo.user.id}); //add this line 8/1,,add {userid:--} 8/6
    navigation.navigate('Home');
    setLoading(false);
  };

  const googleSignout = async () => {
    auth()
      .signOut()
      .then(async () => {
        GoogleSignin.revokeAccess(); //add this line 8/9
        try {
          await AsyncStorage.setItem('@storage_username', '');
          await AsyncStorage.setItem('@storage_userid', '');
        } catch (e) {
          console.log('-3');
        }
        console.log('User signout successfully!');
      })
      .catch(e => Alert.alert('Error', e.message));
    logout();
  }; //동영상에서 하랬던 거

  if (!logged) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dart-content'} />
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
            로그인 후 모든 기능을 정상적으로
          </Text>
          <Text style={{fontSize: 18, textAlign: 'center', fontWeight:'bold'}}>
            이용하실 수 있습니다.
          </Text>
          <Text style={{fontSize: 18, textAlign: 'center', fontWeight:'bold'}}>
            로그인하시려면 하단 버튼을 클릭해주세요
          </Text>
        </View>
        <View style={{flex: 0.2}}></View>
        <View style={{flex: 3}}>
          <TouchableOpacity style={styles.btn} onPress={googleSignIn}>
            <Text style={styles.font}>Google-Sign-In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dart-content'} />
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>
            로그아웃하시려면
          </Text>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
          하단 버튼을 클릭해주세요
          </Text>
        </View>
        <View style={{flex: 0.2}}></View>
        <View style={{flex: 3}}>
          <TouchableOpacity style={styles.btn} onPress={googleSignout}>
            <Text style={styles.font}>Google-Sign-out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
