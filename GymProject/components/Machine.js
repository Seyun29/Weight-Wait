import React from 'react';
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // add this 8/8

//현재는 기구명, 대기인원만 표시되지만, 이미지도 추후 추가할것
const reserve = id => {
  //석우꺼
  /*예약하기버튼, 서버에 회원id랑 예약하고자 하는 머신id주고 성공 or 실패 여부 리턴받기*/
  //인자로 받은 machine id전달받음 -> id 변수
  const machineid = id;
  const getuserid = async () => {
    try {
      const id1 = await AsyncStorage.getItem('@storage_userid');
      console.log(id1);
      if (id1 !== null) {
        fetch(
          'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: id1,
              machineid: '1',
            }),
          },
        )
          .then(response => response.json())
          .then(json => {
            console.log(json);
            Alert.alert(JSON.stringify(json));
            return json;
          })
          .catch(error => {
            console.error(error);
          });
        // value previously stored
      }
    } catch (e) {
      console.log('-1');
      // error reading value
    }
  }; // add this 8/8
  getuserid(); // add this 8/8

  return;
};

const onReserve = id => {
  const waitnum = reserve(id);
  if (waitnum >= 0) {
    const formatted = `${waitnum}번재로 예약성공`;
    Alert.alert(formatted);
  } else {
    Alert.alert('예약실패');
  }
};

const Machine = ({name, id, waitnum}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약하기" onPress={() => onReserve(id)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  machine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
export default Machine;
