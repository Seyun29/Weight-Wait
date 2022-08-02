import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
} from 'react-native';
import Machine from '../components/newMachine.js';
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

const ReserveScreen = () => {
  //서버에서 해당 헬스장의 총 기구 수, 각 기구별 기구 이름&id 및 대기자 수를 서버에서 받아 machinenum, machines에 넣어주기
  let machinenum = 2; //총 머신 개수, 임의로 설정
  const machines = [
    {name: '기구1', id: 1, waitnum: 2},
    {name: '기구2', id: 2, waitnum: 3},
  ]; //임의로 설정

  const [machine, setMachine] = useState(machines);
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
      <View style={styles.categoryView}>
        <Button title="ALL" color={'blue'} />
        <Button title="상체" color={'grey'} />
        <Button title="하체" color={'grey'} />
        <Button title="유산소/기타" color={'grey'} />
      </View>
      <View style={styles.seperator}></View>
      <View style={styles.sortView}>
        <Button title="정렬 : 대기 많은 순" />
      </View>
      <View style={styles.seperator}></View>
      <View style={styles.scrollView}>
        {machine.map(item => {
          return (
            <View>
              <Machine
                key={item.id}
                id={item.id}
                name={item.name}
                waitnum={item.waitnum}></Machine>
            </View>
          );
        })}
      </View>
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
