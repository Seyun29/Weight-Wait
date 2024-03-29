import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import useInterval from '../hooks/useInterval.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
//이용중인기구있음
//이용시작으로부터 경과된 시간 띄워주기, ‘이용종료’ button 구현.
//카운터기능 구현하기, 이용시작시간&이용중인기구이름 props로 받아와야함.
//이용종료 버튼 클릭시 서버에 이용종료 보내는 함수 구현

const HomeScreen0 = ({id, name, time, handler}) => {
  const [userid, setUserid] = useState('');
  const getuserid = async () => {
    try {
      const uid = await AsyncStorage.getItem('@storage_userid');
      if (uid !== null) {
        setUserid(uid);
      } else {
        setUserid(null);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getuserid();
  }, []); // 이제 userid에 사용자 id 들어감
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
          //console.log(json);
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
    return;
  };

  //--- 카운터구현 ---
  //today의 값은 HomeScreen0이 처음 렌더링될떄의 그 값임. (이용종료를 누를 때 어떻게 분기하고 useState쓸지 생각)
  //s_time은 00:00이라고 가정. 서버 API가 나와야 어떤식으로 들어올지 알 수 있음. - 추후 수정해야함.
  //밑의 시간관련 코드는 처음 렌더링될떄 한번만 실행되므로 배워서 수정해야함. + 새로고침 기능 구현
  let s_min = time.substr(3, 2);
  s_min = s_min / 1; //정수변환
  let s_sec = time.substr(6, 2);
  s_sec = s_sec / 1; //정수변환

  const calculator = () => {
    today = new Date();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    let dif_min = min - s_min;
    if (dif_min < 0) dif_min += 60;
    let dif_sec = sec - s_sec;
    if (dif_sec < 0) {
      dif_sec += 60;
      dif_min -= 1;
    }
    let tmp = dif_min * 60 + dif_sec;
    if (tmp < 0) return 0;
    return tmp;
  };
  const [gap, setGap] = useState(calculator());

  const [formatted2, setFormatted2] = useState(
    `${parseInt(gap / 60)}분 ${gap % 60}초`,
  );

  useInterval(() => {
    setGap(calculator());
    setFormatted2(`${parseInt(gap / 60)}분 ${gap % 60}초`);
  }, 1000);

  const [refresh, setRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    handler();
    setRefresh(false);
  });
  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={['#d38657']}
        />
      }>
      <View style={{flex: 0.25, justifyContent: 'flex-end'}}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black',
          }}>
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
          color={'#d38657'}
          onPress={() => {
            finish(id);
            setGap(0);
            handler();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseview: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8F3',
  },
  mediumtext: {fontSize: 30, textAlign: 'center', color: '#30404d'},
  bigtext: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default HomeScreen0;
