import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.contentContainer}>
      <View style={styles.baseview}>
        <Text style={styles.tmptext}>임시설정(내정보)화면</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {flex: 1},
  baseview: {flex: 1, justifyContent: 'center', backgroundColor: 'lightblue'},
  tmptext: {fontWeight: 'bold', fontSize: 20, textAlign: 'center'},
});

export default SettingScreen;
