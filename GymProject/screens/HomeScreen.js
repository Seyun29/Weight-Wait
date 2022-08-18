import React,{useState} from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import HomeScreen0 from './HomeScreen0.js';
import HomeScreen1 from './HomeScreen1.js';
import HomeScreen2 from './HomeScreen2.js';

const HomeScreen = ({navigation, route}) => {
  const [casenum, setCaseNum] = useState(2);
  //casenum = 0: 이용중인기구있음, 1: 이용중인기구없음&이용가능기구존재, 2: 예약내역없음&이용가능기구없음
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
