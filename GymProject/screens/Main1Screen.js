import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Machine from '../components/Machine.js';
import DateHead from '../components/DateHead.js';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';

const verifyReserve = () => {
  /*서버에 회원정보를 주고 예약한 내역이 있으면 앞에 대기하고 있는 회원 수 return*/
  /*예약 내역이 없으면 False return*/
  return;
};
const myReserve = () => {
  /*나의예약내역확인 버튼을 누르면 동작, input : 회원정보  */
  /*if verityReserve == False -> pop up "예약 내역이 없습니다."*/
  /*else if 예약중: pop up "기구명 + 앞서 대기하고 있는 회원 수 보여주기"*/
  Alert.alert('\n이런식으로 팝업 뜨게', '기구명 : xx \n대기 수 : n명');
};

const Main1Screen = () => {
  //회원이 선택한 헬스장의 기구 수, 기구 정보(id, name 등)을 input으로 받습니당
  //서버에서 해당 헬스자의 기구 수, 기구 이름, 대기자 수를 받아옵니당
  let machinenum = 2; //default
  let machinename = ['기구1', '기구2']; //default
  let waitnum = [2, 3]; //default
  //밑에서 반복문 사용을 위해 함수 선언
  function iterate() {
    var blankArray = [];
    for (var i = 0; i < machinenum; i++) {
      blankArray.push(
        <Machine name={machinename[i]} id={i} waitnum={waitnum[i]} />,
      ); // 배열 삽입 시켜줄때 push, 빼낼때는 pop
    }
    return blankArray;
  }
  //이렇게 하게되면 페이지를 재접속할때마다 서버에 요청해야하는 단점이 있음 -> 수정 필요

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      <DateHead />
      <View style={styles.buttonview}>
        <Button
          title="나의 예약내역 확인"
          onPress={myReserve}
          color={'#26a96a'}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {iterate()}
      </ScrollView>
      <View style={{height: '4%'}} />
      {/*for margin*/}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollview: {flex: 1, backgroundColor: '#26a98a'},
  buttonview: {
    height: '15%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

export default Main1Screen;
