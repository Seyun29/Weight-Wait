import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
  Text,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import ModalView from '../components/ModalView.js';
import MachineView from '../components/MachineView.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInterval from '../hooks/useInterval.js';

//새로고침 기능 추가하기 - 밑으로 드래그해서 새로고침, 내비개이션바 크릭해서 새로고침
//***force update사용하기***

const ReserveScreen = ({logged}) => {
  if (!logged) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로그인 후 정상적으로 이용 가능합니다.</Text>
        <Text>하단의 'Account' 탭을 눌러 로그인해주세요.</Text>
      </SafeAreaView>
    );
  }
  //category : All = 0, 상체 = 1, 하체 = 2, 유산소/기타 = 3
  //서버에서 해당 헬스장의 각 기구별 기구 이름&id 및 대기자 수를 서버에서 받아 machinenum, machines에 넣어주기
  const [machines, setMachines] = useState([]);
  const [change1, setChange1] = useState(0); // 예약버튼 누를 때마다 useeffect실행하는데 쓰는 변수 change1

  function handlechange() {
    setChange1(change1 + 1);
  }

  const [loading, setLoading] = useState(0);
  const [loading2, setLoading2] = useState(0);
  //MachineModal 컴포넌트에 전달할 변수

  const getmachineinfo = () => {
    setLoading2(loading2 + 1);
    fetch(
      'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/machine',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        let machinelist = [];
        for (let k = 0; k < json.machinearr.length; k++) {
          let id1 = -1;
          let name1 = '';
          let category1 = -1;
          let waitnum1 = -1;
          let image1 = '';
          for (let i = 0; i < json.machinearr[k].length - 1; i++) {
            switch (i) {
              case 0:
                id1 = Number(json.machinearr[k][i]);
                break; //machineid
              case 1:
                name1 = json.machinearr[k][i];
                break; //machinename
              case 2:
                category1 = Number(json.machinearr[k][i]);
                break; //machinecategory
              case 3:
                image1 = json.machinearr[k][i]; //machineimage
              case 4:
                waitnum1 = json.machinearr[k][i].length;
                break; //waitnumber
            }
          }
          let object = {
            name: name1,
            id: id1,
            waitnum: waitnum1,
            category: category1,
            image: image1, //추가
          };
          machinelist.push(object);
        }
        setMachines(machinelist);
        setLoading(loading + 1);
      })
      .catch(error => {
        console.error(error);
        setLoading(loading + 1);
        return -1;
      });
  };
  useEffect(() => {
    getmachineinfo();
  }, [change1]); //useeffect로 서버에 있는 머신 정보 받아옴

  //나중에는 이미지 url도 필요

  const [username, setUsername] = useState(''); //username 저장

  const getusername = async () => {
    try {
      const name = await AsyncStorage.getItem('@storage_username');
      setUsername(name);
      return;
    } catch (e) {
      console.log(e);
      setUsername('');
    }
  };

  const [userid, setUserid] = useState('');
  const getuserid = async () => {
    const value = await AsyncStorage.getItem('@storage_userid');
    if (value !== null) {
      setUserid(value);
    } else setUserid(null);
  };

  useEffect(() => {
    getusername();
    getuserid();
  }, [logged]);

  const [myres, setMyres] = useState([]);
  const [loading3, setLoading3] = useState(0);
  const [loading4, setLoading4] = useState(0);
  const [usermachine, setUserMachine] = useState([]);

  const myReserve = () => {
    //석우꺼
    setLoading3(loading3 + 1);
    if (userid !== null) {
      const url =
        'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation?userid=' +
        userid;
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setMyres(json['reservation']);
          //console.log(myres);
          setUserMachine(json['reservation']);
          setLoading4(loading4 + 1);
          //console.log(loading4);
          //console.log(myres);
          return myres;
          //setMyres(json['reservation']);
          //console.log(loading4);
          //console.log(myres);
        })
        .catch(error => {
          console.error(error);
          setLoading4(loading4 + 1);
        });
    }
  };
  // add this 8/7 const myReserve랑 const onmyReserve 원래 ReserveScreen 바깥에 있었는데 route로 userid 받아오려고 ReserveScreen 안으로 집어 넣음

  //const [usermachine, setUserMachine] = useState([]);

  const onmyReserve = () => {
    //let tmpusermachine = myReserve(); //usermachine : 사용자가 예약한 기구정보
    myReserve();
    //console.log('tmpusermachine is' + String(tmpusermachine.length));
  }; // ReserveScreen밖에 있는 거 주석처리 하고 안으로 가져옴 8/8

  //ModalView에서 렌더링 문제해결 위해 change2 변수선언
  const [change2, setChange2] = useState(0);
  const handlechange2 = () => {
    setChange2(change2 + 1);
    return;
  };

  useEffect(() => {
    onmyReserve();
  }, [change2]);
  //기구 업데이트 확인용 임시 useEffect, added by seyun 0902

  /*
  useInterval(() => {
    console.log(userid, username);
    getmachineinfo();
  }, 30000); //30초에 한번 자동 업데이트
  */

  const [visible, setVisible] = useState(false); //나의 예약확인버튼 클릭시 팝업제어용

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Modal transparent={true} visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading3 != loading4 ? (
              <View style={{flex: 0.9}}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  예약내역
                </Text>
                <View style={{flex: 2}} />
                <Text>로딩중입니다.</Text>
                <Text>잠시만 기다려주세요...</Text>
                <View style={{flex: 5}} />
              </View>
            ) : (
              <ModalView
                usermachine={usermachine}
                handlerFunction={handlechange}
                handlerFunction2={handlechange2}></ModalView>
            )}

            <Button
              title={'확인'}
              onPress={() => {
                setVisible('false');
              }}
              color={'orange'}></Button>
          </View>
        </View>
      </Modal>
      <View style={styles.btn1view}>
        <Button
          title="나의 예약내역 조회/수정"
          color={'orange'}
          onPress={() => {
            onmyReserve();
            setVisible(true);
          }}
        />
      </View>
      <View style={styles.seperator}></View>
      {loading != loading2 ? (
        <View style={{flex: 7, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1}} />
          <Text>현재 예약가능한 기구가 없습니다.</Text>
          <View style={{flex: 5}} />
        </View>
      ) : (
        /*
        <MachineView
          machine={machines}
          handlerFunction={getmachineinfo}
          category={category}
          sort_cur={sort_cur}
          sort_text={sort_text}
          setCategory={setCategory}
          setSortcur={setSortcur}
          setSorttext={setSorttext}></MachineView>
          */
        <MachineView
          machine={machines}
          handlerFunction={getmachineinfo}></MachineView>
      )}
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
