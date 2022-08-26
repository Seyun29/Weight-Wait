import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // add this 8/8
//나의 예약확인 버튼 클릭시 뜨는 Modal에서 .map()함수를 통한 반복으로 띄워줄 컴포넌트; 이미지, name, waitnum, 예약취소버튼 기능 구현

const MachineModal = ({name, id, waitnum}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약취소"></Button>
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
export default MachineModal;
