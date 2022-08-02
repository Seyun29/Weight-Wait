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
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';

const ReserveScreen = () => {
  //회원이 선택한 헬스장의 기구 수, 기구 정보(id, name 등)을 input으로 받습니당
  //서버에서 해당 헬스자의 기구 수, 기구 이름, 대기자 수를 받아옵니당
  let machinenum = 2; //default
  let machinename = ['기구1', '기구2']; //default
  let waitnum = [2, 3]; //default
  //밑에서 반복문 사용을 위해 함수 선언
  return (
    <SafeAreaView style={{flex : 1}}>
        <View style={styles.btn1view}>
            <Button title="나의 예약내역 조회/수정" color={'#26a96a'}/>
        </View>
        <View style={styles.seperator}></View>
        <View style={styles.categoryView}>
            <Button title="ALL" color={'blue'}/>
            <Button title="상체" color={'grey'}/>
            <Button title="하체" color={'grey'}/>
            <Button title="유산소/기타" color={'grey'}/>
        </View>
        <View style={styles.seperator}></View>
        <View style={styles.sortView}>
            <Button title="정렬"/>
        </View>
        <View style={styles.seperator}></View>
        <View style={styles.scrollView}>
        </View>
        <View style={{height:'5%'}}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  seperator : {
    height: 1,
    backgroundColor : 'black',
  },
  btn1view : {flex : 1, backgroundColor : 'red', flexDirection : 'row-reverse'},
  categoryView : {flex : 1, backgroundColor : 'white', flexDirection : 'row', justifyContent : 'space-around'},
  sortView : {flex : 0.5, backgroundColor : 'yellow', flexDirection : 'row', },
  scrollView : {flex : 6, backgroundColor : 'grey'},

});

export default ReserveScreen;