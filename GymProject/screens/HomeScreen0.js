import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
//이용중인기구있음
//이용시작으로부터 경과된 시간 띄워주기, ‘이용종료’ button 구현.
//카운터기능 구현하기, 이용시작시간&이용중인기구이름 props로 받아와야함.
//이용종료 버튼 클릭시 서버에 이용종료 보내는 함수 구현

const finish = () => {
//석우꺼, 서버에 user id, 기구 id주고 이용종료 구현. 성공시 1, 실패시 0 return
return;
}
const onfinish = () => {
//세윤꺼, 인자 전달 HomeScreen으로부터 뭐뭐받아야하는지 판단해서 짜기.
    const returnval = finish();
    console.log('와우');
    //이후 returnval 결과에 따라 Alert구현.
    return;
}

const HomeScreen0 = ({s_time, name}) => {
    //카운터 기능 구현하기
    //Date기능 참고 : https://dororongju.tistory.com/116
    //s_time은 00:00이라고 가정. 서버 API가 나와야 어떤식으로 들어올지 알 수 있음. - 추후 수정해야함.
    //밑의 시간관련 코드는 처음 렌더링될떄 한번만 실행되므로 배워서 수정해야함. + 새로고침 기능 구현
    let s_min = s_time.substr(0,2);
    s_min = s_min/1; //정수변환
    let s_sec = s_time.substr(2,2);
    s_sec = s_sec/1; //정수변환

    const today = new Date();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    let dif_min = min-s_min;
    if (min-s_min < 0)
        dif_min = dif_min+60;
    let dif_sec = sec-s_sec;
    if (sec-s_sec<0)
        dif_sec = dif_sec+60;

    const formatted1 = `현재 이용중인 기구 : ${name}`
    const formatted2 = `이용시작부터 ${dif_min}분 ${dif_sec}초 경과되었습니다.`
    return(
        <View style={styles.baseview}>
        <Text>{formatted1}</Text>
        <Text>{formatted2}</Text>
        <Button title={'이용종료'} onPress={()=>{onfinish()}}/>
        </View>
    );
}

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'white'},
});

export default HomeScreen0;