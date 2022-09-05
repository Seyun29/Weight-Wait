import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';
//이용중인기구있음
//이용시작으로부터 경과된 시간 띄워주기, ‘이용종료’ button 구현.
//카운터기능 구현하기, 이용시작시간&이용중인기구이름 props로 받아와야함.
//이용종료 버튼 클릭시 서버에 이용종료 보내는 함수 구현

const HomeScreen0tmp = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
        <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
          현재 이용중인 기구
        </Text>
        <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
          ...
        </Text>
      </View>
      <View style={styles.baseview}>
        <Text style={styles.mediumtext}>이용시작부터</Text>
        <Text style={styles.bigtext}>..분 ..초</Text>
        <Text style={styles.mediumtext}>경과되었습니다.</Text>
      </View>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        <Button title={'이용종료'} color={'orange'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseview: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mediumtext: {fontSize: 30, textAlign: 'center'},
  bigtext: {fontSize: 60, fontWeight: 'bold', textAlign: 'center'},
});

export default HomeScreen0tmp;
