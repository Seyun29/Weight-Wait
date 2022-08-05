import React from 'react';
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
//현재는 기구명, 대기인원만 표시되지만, 이미지도 추후 추가할것
const reserve = () => {
  //석우꺼
  /*예약하기버튼, 서버에 회원id랑 예약하고자 하는 머신id주고 성공 or 실패 여부 리턴받기*/
  Alert.alert('성공/실패에 해당하는 메세지 출력');
};
const Machine = ({name, id, waitnum}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약하기" onPress={reserve}></Button>
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
