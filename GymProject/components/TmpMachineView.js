import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import Machine from './Machine.js';

const TmpMachineView = () => {
  return (
    <View style={{flex: 7}}>
      <View style={styles.categoryView}>
        <Button title="ALL" color={'#d38657'} />

        <Button title="상체" color={'grey'} />

        <Button title="하체" color={'grey'} />

        <Button title="유산소/기타" color={'grey'} />
      </View>

      <View style={styles.seperator}></View>

      <View style={styles.sortView}>
        <Button title={'정렬 : 대기 적은 순'} color={'#d38657'} />
      </View>

      <View style={{height: 9}}></View>

      <View style={styles.scrollView}>
        <ScrollView style={{backgroundColor: '#FFF8F3'}}>
          <View style={{flex: 1}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#d38657',
    marginVertical: 7,
  },
  categoryView: {
    flex: 0.6,
    backgroundColor: '#FFF8F3',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortView: {
    flex: 0.6,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    flex: 6,
    backgroundColor: '#FFF8F3',
    borderTopColor: '#d38657',
    borderTopWidth: 1,
  },
});

export default TmpMachineView;
