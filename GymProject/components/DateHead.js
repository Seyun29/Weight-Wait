import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DateHead = () => {
  const date = new Date();
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  return (
    <View style={styles.block}>
      <Text style={styles.dateText}>
        {year}년 {month}월 {day}일 //헤더(추후 수정)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    padding: '5%',
    backgroundColor: '#26a96a',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});
export default DateHead;
