import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import useInterval from '../hooks/useInterval.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
//이용중인기구있음
//이용시작으로부터 경과된 시간 띄워주기, ‘이용종료’ button 구현.
//카운터기능 구현하기, 이용시작시간&이용중인기구이름 props로 받아와야함.
//이용종료 버튼 클릭시 서버에 이용종료 보내는 함수 구현

const HomeScreen0 = ({s_time, id, name, today, handler}) => {
  const [userid, setUserid] = useState('');
  const getuserid = async () => {
    try {
      const uid = await AsyncStorage.getItem('@storage_userid');
      setUserid(uid);
      return;
    } catch (e) {
      console.log(e);
    }
  };
  getuserid(); // 이제 userid에 사용자 id 들어감
  const finish = machineid => {
    try {
      fetch(
        'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/return',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            machineid: String(machineid),
            userid: String(userid),
          }),
        },
      )
        .then(response => response.json())
        .then(json => {
          console.log(json);
          try {
            console.log('이용종료 성공했습니다.');
            Alert.alert('이용을 종료합니다.');
            return 1;
            //제대로 이용종료 되었을 때 1 리턴
          } catch (e) {
            //이용종료 실패했을 때 -1 리턴
            console.log('이용종료 실패했습니다.');
            Alert.alert('이용종료에 실패했습니다. 다시 시도해주세요.');
            return -1;
          }
        });
    } catch (e) {
      console.log('17');
      console.log(e);
      Alert.alert('이용종료에 실패했습니다. 다시 시도해주세요.');
    }
    Alert.alert('이용종료에 실패했습니다. 다시 시도해주세요.');
    return;
  };

  //--- 카운터구현 ---
  //today의 값은 HomeScreen0이 처음 렌더링될떄의 그 값임. (이용종료를 누를 때 어떻게 분기하고 useState쓸지 생각)
  //s_time은 00:00이라고 가정. 서버 API가 나와야 어떤식으로 들어올지 알 수 있음. - 추후 수정해야함.
  //밑의 시간관련 코드는 처음 렌더링될떄 한번만 실행되므로 배워서 수정해야함. + 새로고침 기능 구현
  let s_min = s_time.substr(3, 2);
  s_min = s_min / 1; //정수변환
  let s_sec = s_time.substr(6, 2);
  s_sec = s_sec / 1; //정수변환
  const min = today.getMinutes();
  const sec = today.getSeconds();
  let dif_min = min - s_min;
  if (min - s_min < 0) dif_min = dif_min + 60;
  let dif_sec = sec - s_sec;
  if (sec - s_sec < 0) dif_sec = dif_sec + 60;

  const tmp = dif_min * 60 + dif_sec;
  const [gap, setGap] = useState(tmp);
  const formatted2 = `${parseInt(gap / 60)}분 ${gap % 60}초`;

  useInterval(() => {
    setGap(gap + 1);
    //console.log('시작시간 : ', s_min, '분', s_sec, '초');
    //console.log('현재시간 : ', min, '분', sec, '초');
    //console.log('diff :', dif_min, '분', dif_sec, '초');
    //console.log('gap :', gap);
  }, 1000);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
        <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
          현재 이용중인 기구
        </Text>
        <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
          {name}
        </Text>
      </View>
      <View style={styles.baseview}>
        <Text style={styles.mediumtext}>이용시작부터</Text>
        <Text style={styles.bigtext}>{formatted2}</Text>
        <Text style={styles.mediumtext}>경과되었습니다.</Text>
      </View>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        <Button
          title={'이용종료'}
          color={'orange'}
          onPress={() => {
            finish(id);
            handler();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseview: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mediumtext: {fontSize: 30, textAlign: 'center'},
  bigtext: {fontSize: 60, fontWeight: 'bold', textAlign: 'center'},
});

export default HomeScreen0;
