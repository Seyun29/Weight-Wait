import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ModalView = ({isreserved, usermachine}) => {
  console.log(isreserved);
  if (isreserved) {
    return (
      <View>
        {usermachine.map(item => {
          return (
            <View key={item.id}>
              <Text>
                기구명 : {item.name}, 대기자수 : {item.waitnum}
              </Text>
            </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <View>
        <Text>현재 예약중인 기구가 없습니다</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({});
export default ModalView;
