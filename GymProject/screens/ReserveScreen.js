import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
  Text
} from 'react-native';
import Machine from '../components/Machine.js';
import MachineView from '../components/MachineView.js'
//새로고침 기능 추가하기
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
const getMachineInfo = () => {
/*서버에 있는 해당 헬스장의 총 기구 정보 객체 배열 형태로 가져오기
ex )
[
    {name: '기구1', id: 1, waitnum: 2, category: 1},
    {name: '기구2', id: 2, waitnum: 3, category : 2},
    {name: '기구3', id: 3, waitnum: 4, category : 3},
    {name: '기구4', id: 4, waitnum: 5, category : 1},
    {name: '기구5', id: 5, waitnum: 6, category : 2},
    {name: '기구6', id: 6, waitnum: 7, category : 1},
    {name: '기구7', id: 7, waitnum: 7, category : 2},
]
*/
    return;
}

const ReserveScreen = ({category}) => {//category : All = 0, 상체 = 1, 하체 = 2, 유산소/기타 = 3
  //서버에서 해당 헬스장의 총 기구 수, 각 기구별 기구 이름&id 및 대기자 수를 서버에서 받아 machinenum, machines에 넣어주기
  let machines = getMachineInfo();
  machines = [
    {name: '기구1', id: 1, waitnum: 2, category: 1},
    {name: '기구2', id: 2, waitnum: 3, category : 2},
    {name: '기구3', id: 3, waitnum: 4, category : 3},
    {name: '기구4', id: 4, waitnum: 5, category : 1},
    {name: '기구5', id: 5, waitnum: 6, category : 2},
    {name: '기구6', id: 6, waitnum: 7, category : 1},
    {name: '기구7', id: 7, waitnum: 7, category : 2},
  ]; //디폴트값, 테스트용으로 임의 설정

  let machinenum = machines.length;
  let machine = machines;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.btn1view}>
        <Button
          title="나의 예약내역 조회/수정"
          color={'#26a96a'}
          onPress={myReserve}
        />
      </View>
      <View style={styles.seperator}></View>
      <MachineView machine={machine}></MachineView>
      <View style={{height: '5%'}}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  btn1view: {
    flex: 0.6,
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  categoryView: {
    flex: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortView: {flex: 0.5, flexDirection: 'row', marginLeft: 10},
  scrollView: {flex: 6, backgroundColor: 'white'},
});

export default ReserveScreen;
