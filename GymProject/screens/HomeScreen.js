import React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';

const HomeScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      <View style={styles.baseview}>
        <Text style={styles.tmptext}>임시홈화면</Text>
        <Text style={styles.tmptext}>
          {'\n\n'}상단 헤더 및 하단 네비게이션 바 수정 예정
        </Text>
      </View>
    </SafeAreaView>
  ); // ({route})랑 Button 8/6추가
};
/*
<Button
        title="예약하러가기"
        onPress={() => navigation.navigate('Reserve',{userid:route.params.userid})}
      />  
*/
const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'lightblue'},
  tmptext: {fontWeight: 'bold', fontSize: 20, textAlign: 'center'},
});

export default HomeScreen;
