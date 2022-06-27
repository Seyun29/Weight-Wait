import React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateHead from '../components/DateHead.js';
const SettingScreen = () => {
  return (
    <SafeAreaView contentContainerstyle={styles.contentContainer}>
      <DateHead />
      <View style={styles.baseview}>
        <Text style={styles.tmptext}>임시설정(내정보)화면</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {flex: 1, alignItems: 'center'},
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'lightblue'},
  tmptext: {fontWeight: 'bold', fontSize: 20, textAlign: 'center'},
});

export default SettingScreen;
