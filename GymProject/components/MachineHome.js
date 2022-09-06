import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
import useInterval from '../hooks/useInterval.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MachineHome = ({name, id, time, image, handler}) => {
  const [userid, setUserid] = useState('');
  const getuserid = async () => {
    try {
      const uid = await AsyncStorage.getItem('@storage_userid');
      if (uid !== null) {
        setUserid(uid);
      }
      else{
        setUserid(null);
    };
      return;
    } catch (e) {
      console.log(e);
    }
  };
  getuserid(); // 이제 userid에 사용자 id 들어감

  const start = machineid => {
    try {
      fetch(
        'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/start',
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
          if (json['success'] == true) {
            console.log('사용시작성공');
            Alert.alert('이용을 시작합니다.');
            return 1; //정상적으로 사용시작 시 1 리턴
          } else {
            console.log('사용시작실패');
            Alert.alert('이용시작에 실패했습니다. 다시 시도해주세요.');
            return -1; // 사용시작 실패 시 -1 리턴
          }
        });
    } catch (e) {
      console.log('17');
      console.log(e);
      Alert.alert('이용시작에 실패했습니다. 다시 시도해주세요.');
    }
    return;
  };

  //image경로문제 해결해야함.
  //'13:04:27'

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
    if (tmp <= 0) return 180;
    return 180 - tmp;
  };

  const [gap, setGap] = useState(calculator());
  const [formatted2, setFormatted2] = useState(
    `기구명 : ${name}\n\n이용까지 남은시간 : ${parseInt(gap / 60)}분 ${
      gap % 60
    }초`,
  );

  useInterval(() => {
    setGap(calculator());
    setFormatted2(
      `기구명 : ${name}\n\n이용까지 남은시간 : ${parseInt(gap / 60)}분 ${
        gap % 60
      }초`,
    );
  }, 1000);

  //const formatted2 = `기구명 : ${name}\n\n이용까지 남은시간 : ${parseInt(
  //  gap / 60,
  //)}분 ${gap % 60}초`;
  const formatted3 = `기구명 : ${name}\n\n이용까지 남은시간 : 이용불가`;
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 90, height: 90}}></Image>
      <View style={{width: '50%'}}>
        {gap < 0 ? (
          <Text style={{fontSize: 15}}>{formatted3}</Text>
        ) : (
          <Text style={{fontSize: 15}}>{formatted2}</Text>
        )}
      </View>
      <Button
        title={'이용시작'}
        color={'orange'}
        onPress={() => {
          start(id);
          setGap(0);
          handler();
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  machine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
});

export default MachineHome;
