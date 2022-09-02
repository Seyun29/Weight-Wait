import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import HomeScreen0 from './HomeScreen0.js';
import HomeScreen1 from './HomeScreen1.js';
import HomeScreen2 from './HomeScreen2.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({logged}) => {
  if (!logged) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로그인 후 정상적으로 이용 가능합니다.</Text>
        <Text>하단의 'Account' 탭을 눌러 로그인해주세요.</Text>
      </SafeAreaView>
    );
  }
  const [casenum, setCaseNum] = useState(0);
  const [userid,setUserid]=useState('');
  const getuserid= async()=>{
    const value = await AsyncStorage.getItem('@storage_userid');
    if (value !== null){
        setUserid(value);
    }
  }
  getuserid();

  const checkuser = () => {
    //석우꺼-user id&헬스장 id 넘겨주고 user의 이용정보 리스트 json으로 받아오기
    //받아와야하는 정보는 다음과 같다 :
    //1. 이용중인 기구의 id, name, 이용시작시간 (이용중이지 않을경우 3개 다 null혹은 -1값)
    //2. 이용가능한 기구의 image, id, name, 이용가능시작시간 (이용가능한 기구가 없을 경우 3개 다 null혹은 -1값)
    //-> 이용가능한 기구는 여러개일수있으므로 리스트 형식으로 반환받아야함.
    //-> 내가 length메소드 사용해서 이용가능한 기구의 수를 체크할것
    //다시 정리해서 보내줘야할듯 석우한테.
    if (userid !== null) {
      const url =
        'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/checkuser?userid=' +
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
          if(json.usinginfo.length!==0){
            //사용하고 있는 기구가 있는 경우
            let currentmachine = [];
            let macid=Number(json.usinginfo[0][0]);
            let macname=json.usinginfo[0][1];
            let starttime=json.usinginfo[0][2];
            let object={
              machineid: macid,
              machinename: macname,
              time:starttime
            }
            currentmachine.push(object);
            return currentmachine;
            
        }
          else if(json.availinfo.length!==0){
            //사용하고 있는 기구는 없는데 현재 이용가능한 기구가 있는 경우
            let availablelist=[];
            for(let i=0;i<json.availinfo.length;i++){
              let macid1=Number(json.usinginfo[i][0]);
              let macname1=json.usinginfo[i][1];
              let availabletime1=json.usinginfo[i][2];
              let image1=json.usinginfo[i][2]
              let object1={
                machineid:macid1,
                machinename:macname1,
                availabletime:availabletime1,
                image:image1
              }
              availablelist.push(object1);
            }
            return availablelist;
          }
          else{
            //사용하고 있는 기구도 없고 현재 이용가능한 기구도 없는 경우
            return -1;
          }
        })
        .catch(error => {
          console.error(error);
          
        });
    }

  };
  const casify = () => {
    //내꺼-> checkuser()의 리스트보고 0,1,2 중 하나로 return
    return;
  };
  //setCaseNum(checkuser()); -> 이부분에서 infinite loop 에러남, 해결해야할듯.
  //casenum = 0: 이용중인기구있음, 1: 이용중인기구없음&이용가능기구존재, 2: 이용중인기구없음&이용가능기구없음
  //각 HomeScreen마다 필요한 props들 넘겨주기
  if (casenum === 0) {
    //이용중인기구있음
    //s_time, id, name은 일단 테스트용, s_time은 xxxx의 문자열형식이라고 가정, 수정해야함.
    return (
      <SafeAreaView style={styles.baseview}>
        <HomeScreen0 s_time={'0000'} id={1} name={'벤치'} today={new Date()} />
      </SafeAreaView>
    );
  } else if (casenum === 1) {
    //이용중인기구없음&이용가능기구존재
    //이용가능기구객체 -> {id : , name : , time : , image : ,}
    let availablelist = [
      {
        id: 1,
        name: '앙기모링',
        time: '4300',
        image: '../images/default_image.png',
      },
      {
        id: 2,
        name: '기뮤링',
        time: '5000',
        image: '../images/default_image.png',
      },
    ];
    return (
      <SafeAreaView style={styles.baseview}>
        <HomeScreen1 list={availablelist} today={new Date()} />
      </SafeAreaView>
    );
  } else if (casenum === 2) {
    //이용중인기구없음&이용가능기구없음
    return (
      <SafeAreaView style={styles.baseview}>
        <HomeScreen2 />
      </SafeAreaView>
    );
  } else {
    Alert.alert('예외처리');
    return <SafeAreaView></SafeAreaView>;
  }
};
const styles = StyleSheet.create({
  baseview: {flex: 1, backgroundColor: 'white'},
});

export default HomeScreen;
