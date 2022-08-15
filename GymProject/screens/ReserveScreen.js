import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
  Text,
  Modal,
} from 'react-native';
import ModalView from '../components/ModalView.js';
import MachineView from '../components/MachineView.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
//새로고침 기능 추가하기 - 밑으로 드래그해서 새로고침, 내비개이션바 크릭해서 새로고침

const getMachineInfo =  () => {
    fetch('https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/machine?category=7',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((error) => {
      console.error(error);
      return -1;
    });
};
  //석우꺼
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
  


  
const ReserveScreen = ({navigation, route, category}) => {
  //navigation,route 추가 8/6
  //category : All = 0, 상체 = 1, 하체 = 2, 유산소/기타 = 3
  //서버에서 해당 헬스장의 각 기구별 기구 이름&id 및 대기자 수를 서버에서 받아 machinenum, machines에 넣어주기

  //const userid = route.params.userid; 8/8 주석처리

  const myReserve = () => {
    //route추가 8/7  8/8에 지움
    //석우꺼
    const getuserid = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_userid');
        if (value !== null) {
          const url =
            'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation?userid=' +
            value;
          fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            /*body: JSON.stringify({
   userid: '116539218716908666669'
 })*/
          })
            .then(response => response.json())
            .then(json => {
              console.log(json);
              Alert.alert(JSON.stringify(json));
              return json;
            })
            .catch(error => {
              console.error(error);
            });
        }
      } catch (e) {
        console.log('-1');
        // error reading value
      }
    };
    return getuserid(); // add this 8/8

    //const userid=route.params.userid;

    // add this 8/8 여기 userid가 안 받아지는데 이거 받을 수 있게 수정
    //const url="https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation?userid="+userid

    //fetch(url, {
    //         method: 'GET',
    //         headers: {
    //         Accept: 'application/json',
    //   "Content-Type": 'application/json'
    //  },
    /*body: JSON.stringify({
      userid: '116539218716908666669'
    })*/
    // }).then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    //   Alert.alert(JSON.stringify(json));
    //   return json;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });  //add this
    /*서버에 회원정보를 주고 예약한 내역이 있으면 기구명과 앞에 대기하고 있는 회원 수 return*/
    
  };
  // add this 8/7 const myReserve랑 const onmyReserve 원래 ReserveScreen 바깥에 있었는데 route로 userid 받아오려고 ReserveScreen 안으로 집어 넣음

  const [usermachine, setUserMachine] = useState([]);
  const [isreserved, setIsReserved] = useState(false);
  const onmyReserve = () => {
    let tmpusermachine = myReserve(); //usermachine : 사용자가 예약한 기구정보
    tmpusermachine = [
      {name: '기구1', id: 1, waitnum: 2},
      {name: '기구2', id: 2, waitnum: 3},
    ];
    if (tmpusermachine.length > 0) {
      setIsReserved(true);
    } else {
      setIsReserved(false);
    }
    //setUserMachine(tmpusermachine); 실제 코드
    setUserMachine(tmpusermachine); //이런식으로 필요함, default 값
  }; // ReserveScreen밖에 있는 거 주석처리 하고 안으로 가져옴 8/8

  let machines = getMachineInfo();
  machines = [
    {name: '기구1', id: 1, waitnum: 2, category: 1},
    {name: '기구2', id: 2, waitnum: 3, category: 2},
    {name: '기구3', id: 3, waitnum: 4, category: 3},
    {name: '기구4', id: 4, waitnum: 5, category: 1},
    {name: '기구5', id: 5, waitnum: 6, category: 2},
    {name: '기구6', id: 6, waitnum: 7, category: 1},
    {name: '기구7', id: 7, waitnum: 7, category: 2},
    {name: 'abc', id: 8, waitnum: 4, category: 1},
  ];  //디폴트값, 테스트용으로 임의 설정

  let machine = machines;

  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Modal transparent={true} visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ModalView
              isreserved={isreserved}
              usermachine={usermachine}></ModalView>
            <Button
              title={'확인'}
              onPress={() => {
                setVisible('false');
              }}></Button>
          </View>
        </View>
      </Modal>
      <View style={styles.btn1view}>
        <Button
          title="나의 예약내역 조회/수정"
          color={'#26a96a'}
          onPress={() => {
            onmyReserve();
            setVisible(true);
          }}
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
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalContent: {
    flex: 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 20,
  },
});

export default ReserveScreen;
