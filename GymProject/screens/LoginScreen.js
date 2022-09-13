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
import useInterval from '../hooks/useInterval.js';
import PushNotification from 'react-native-push-notification'; //added on 0910

GoogleSignin.configure({
  webClientId:
    '2931885723-73sv03pffs2m9v6l84p1t0bimha7nktt.apps.googleusercontent.com',
});

const LoginScreen = ({logged, handle1, handle2}) => {
  const isNotification = () => {
    /*석우꺼 : 서버에 userid넘겨주고 해당 user에게 올 알림이 없으면 0 리턴,
    해당 user에게 올 알림이 있는 경우 기구이름으로 된 리스트 리턴. 
    ex) return ['bench']
    알림이 여러개인 경우, ['bench', 'treadmil'] ... */

    /*
    서버에서는 유저 배열 (혹은 딕셔너리)를 만들어서 유지하고 있다가
    user가 이용가능한 상태가 될때마다 (대기자가 0명인 기구를 예약한 경우 or 이전 대기자가 이용을 종료한 경우)
    해당 기구이름을 해당 user의 알림 큐에 추가.
    가령 userid가 12345, 78925인 경우
    { 12345 : ['bench'], 78925 : ['treadmil', 'squat rack1'] }
    프론트에서 특정 userid에 대한 알림이 있는지 요청이오면 없는 경우 0, 있는 경우 알림을 보낼 기구이름 리스트를
    보내주면됨. (ex. ['treadmil', 'squat rack1'])
    보내준 이후 해당 user의 알림큐는 삭제해서 초기화시켜줘야함!!
    */
    return;
  };

  useInterval(() => {
    if (logged) {
      //console.log('interval working ...');
      let returnval = isNotification();
      returnval = []; //default value, 삭제예정
      //console.log(returnval != 0);
      if (returnval != 0) {
        let num = returnval.length;
        let today = new Date();
        while (num > 0) {
          PushNotification.localNotification({
            channelId: '1',
            title: `[${returnval[num - 1]}] 이용가능 알림`,
            message: `홈 화면에서 이용을 시작하실 수 있습니다.`,
            allowWhileIdle: 'true',
          });
          num -= 1;
        }
      }
    }
  }, 5000); //added by Seyun on 0910

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
        <StatusBar backgroundColor={'#FFF8F3'} barStyle={'dark-content'} />
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#30404d',
            }}>
            로그인 후 모든 기능을 정상적으로
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#30404d',
            }}>
            이용하실 수 있습니다.
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#30404d',
            }}>
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
        <StatusBar backgroundColor={'#FFF8F3'} barStyle={'dark-content'} />
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#30404d',
              letterSpacing: 1,
            }}>
            로그아웃하시려면
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#30404d',
              letterSpacing: 0.5,
            }}>
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
    backgroundColor: '#FFF8F3',
  },
  btn: {
    padding: 8,
    //borderWidth: 1,
    borderRadius: 10,
    borderColor: '#1E3C66',
    backgroundColor: '#d38657',
  },
  text: {
    fontSize: 16,
  },
  font: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF8F3',
  },
});

export default LoginScreen;
