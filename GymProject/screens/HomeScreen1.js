import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
//이용가능한 기구리스트 띄워주기, 각 기구별로 ‘이용 시작’ 가능시간까지 남은 시간 띄워주기, ‘이용시작’ button 구현.
//밑의 내용을 리스트 형식으로 구현, 인당 최대 예약이 3개인 점 고려.
const HomeScreen1 = () =>{
    return(
        <View style={styles.baseview}>
        <Text>현재 이용가능한 기구 : ~</Text>
        <Text>이용시작까지 ~분 남았습니다.</Text>
        <Text>주의: n분 내에 '이용시작'버튼을 누르지 않으면 자동 종료됩니다.</Text>
        <Button title={'이용시작'}/>
        </View>
    );}

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'white'},
});

export default HomeScreen1;