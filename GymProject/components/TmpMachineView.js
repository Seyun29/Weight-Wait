import React from 'react';
import {ScrollView, StyleSheet, View, Button} from 'react-native';

const TmpMachineView = () => {
  return (
    <View style={{flex: 7}}>
      <View style={styles.categoryView}>
        <Button title="ALL" color={'orange'} />

        <Button title="상체" color={'grey'} />

        <Button title="하체" color={'grey'} />

        <Button title="유산소/기타" color={'grey'} />
      </View>

      <View style={styles.seperator}></View>

      <View style={styles.sortView}>
        <Button title={'정렬 : 대기 적은 순'} color={'orange'} />
      </View>

      <View style={{height: 9}}></View>

      <View style={styles.scrollView}>
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={{flex: 1}}></View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  categoryView: {
    flex: 0.6,
    backgroundColor: 'white',
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
  scrollView: {flex: 6, backgroundColor: 'white'},
});

export default TmpMachineView;
