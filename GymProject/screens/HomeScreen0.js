import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
//이용중인기구있음
//이용시작으로부터 경과된 시간 띄워주기, ‘이용종료’ button 구현.
//카운터기능 구현하기, 이용시작시간&이용중인기구이름 props로 받아와야함.
//이용종료 버튼 클릭시 서버에 이용종료 보내는 함수 구현
const HomeScreen0 = () => {
    return(
        <View style={styles.baseview}>
        <Text>현재 이용중인 기구 : ~</Text>
        <Text>이용시작부터 ~분 경과되었습니다.</Text>
        <Button title={'이용종료'}/>
        </View>
    );
}

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'white'},
});

export default HomeScreen0;