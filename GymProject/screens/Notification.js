import React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateHead from '../components/DateHead.js';
const NotificationScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DateHead />
      <View style={styles.baseview}>
        <Text style={styles.tmptext}>임시알림화면..</Text>
        <Text style={styles.tmptext}>
          {'\n\n본인 차례가 되거나, \n본인 차례 1-2전에 알림기능 \n알림 로그'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'lightblue'},
  tmptext: {fontWeight: 'bold', fontSize: 20, textAlign: 'center'},
});

export default NotificationScreen;
