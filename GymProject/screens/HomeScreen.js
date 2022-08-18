import React,{useState} from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import HomeScreen0 from './HomeScreen0.js';
import HomeScreen1 from './HomeScreen1.js';
import HomeScreen2 from './HomeScreen2.js';

const HomeScreen = ({navigation, route}) => {
  const [casenum, setCaseNum] = useState(0);
  const checkuser=()=>{
  //석우꺼-user id&헬스장 id 넘겨주고 user의 이용정보 리스트 json으로 받아오기
  //받아와야하는 정보는 다음과 같다 :
  //1. 이용중인 기구의 id, name, 이용시작시간 (이용중이지 않을경우 3개 다 null혹은 -1값)
  //2. 이용가능한 기구의 id, name, 이용가능시작시간 (이용가능한 기구가 없을 경우 3개 다 null혹은 -1값)
  //-> 총 6개 변수 필요
    return;
  };
  const casify=()=>{
  //내꺼-> checkuser()의 리스트보고 0,1,2 중 하나로 return
    return;
  }
  //setCaseNum(checkuser()); -> 이부분에서 infinite loop 에러남, 해결해야할듯.
  //casenum = 0: 이용중인기구있음, 1: 이용중인기구없음&이용가능기구존재, 2: 이용중인기구없음&이용가능기구없음
  if (casenum === 0){ //이용중인기구있음
    return (
     <SafeAreaView style={styles.baseview}>
     <HomeScreen0/>
     </SafeAreaView> );
    }
   else if (casenum ===1){ //이용중인기구없음&이용가능기구존재
        return(
     <SafeAreaView style={styles.baseview}>
     <HomeScreen1/>
     </SafeAreaView> );
   }
   else if (casenum === 2){ //이용중인기구없음&이용가능기구없음
        return(
        <SafeAreaView style={styles.baseview}>
        <HomeScreen2/>
        </SafeAreaView> );
      }
   else{
        Alert.alert('예외처리');
        return(<SafeAreaView></SafeAreaView>);
   }
}
const styles = StyleSheet.create({
  baseview: {flex: 1, backgroundColor: 'white'},
});

export default HomeScreen;
