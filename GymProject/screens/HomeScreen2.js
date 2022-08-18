import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';

const HomeScreen2 = () =>{
    return(
        <View style={styles.baseview}>
        <Text>현재 이용가능한 기구가 없습니다.</Text>
        </View>
    );}

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'},
  text:{},
});

export default HomeScreen2;