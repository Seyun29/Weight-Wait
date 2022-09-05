import React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
import MachineHome from '../components/MachineHome.js';

//이용가능한 기구리스트 띄워주기, 각 기구별로 ‘이용 시작’ 가능시간까지 남은 시간 띄워주기, ‘이용시작’ button 구현.
//밑의 내용을 리스트 형식으로 구현, 인당 최대 예약이 3개인 점 고려.

const HomeScreen1tmp = () => {
  return (
    <View style={styles.baseview}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.bigtext}>현재 이용중인 기구가 없습니다.</Text>
        <Text> </Text>
        <Text style={styles.mediumtext}>
          아래에서 이용하실 기구를 선택하세요.
        </Text>
      </View>
      <View style={{flex: 3}}>
        <Text> 로딩중 ... </Text>
        <Text> *주의 : 3분이 경과되어도 이용을 시작하지 않으면</Text>
        <Text> 다음 대기자에게 순서가 넘어갑니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseview: {flex: 1, backgroundColor: 'white'},
  mediumtext: {fontSize: 20, textAlign: 'center'},
  bigtext: {fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
});

export default HomeScreen1tmp;
