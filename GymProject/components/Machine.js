import React from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
//미완성
const reserve = () => {
  /*예약하기버튼, 서버에 회원id랑 예약하고자 하는 머신id주고 성공 or 실패 여부 리턴받기*/
  Alert.alert('성공/실패에 해당하는 메세지 출력');
};
const Machine = ({name, id, waitnum}) => {
  const formatted = `머신명 : ${name}           현재 대기수 : ${waitnum}`;
  return (
    <View style={styles.view}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.text}>{formatted}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title="예약하기" color="#26a96a" onPress={reserve} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    //어차피 flatlist로 다시 구현해줘야할듯
    height: 100,
    backgroundColor: 'white',
    margin: '1%',
    padding: '3%',
  },
  text: {
    color: 'black',
    backgroundColor: 'ivory',
    textAlign: 'center',
    fontSize: 20,
  },
  reservebutton: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 9,
  },
});
export default Machine;
