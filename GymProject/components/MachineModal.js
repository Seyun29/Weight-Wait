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

const MachineModal = ({name, id, waitnum,change2,handlerFunction}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  const [userid,setUserid]=useState('');
  const getusername = async () => {
    
    try{const uid=await AsyncStorage.getItem('@storage_userid');
    setUserid(uid);
    return }
    catch(e){
        console.log(e);
    }
  }
  getusername(); 

  const change3=change2;
  function handlechange1(){
    handlerFunction();
  }

  const machinereturn= (machineid,usid) => {  // machinereturn함수 machineid는 반납하려는 머신id주면되고, usid는 userid인데 위에 선언했으니깐 userid 쓰면 됨
                                              // 제대로 반납되면 1, 반납 안 되면 -1 리턴                                          
    try{
    fetch(
      'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/return',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineid: String(machineid),
          userid: String(usid),
        }),
      },
    )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      try{
        tim=json["time"];
        handlechange1();
        Alert.alert("반납되었습니다.");
        return 1;  
    }
      catch(e){
        handlechange1();
        Alert.alert("반납에 실패했습니다.") 
        return -1

      }
    })
  }
  catch(e){
    console.log('17');
    console.log(e);
  }
   }


  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약취소" onPress={() =>machinereturn(id,userid) }></Button>
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
