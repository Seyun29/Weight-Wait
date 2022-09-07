import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import MachineModal from './MachineModal.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
//usermachine : name, id, waitnum
//machine component(이미지, name, waitnum, 예약 취소 버튼)도 띄워줘야함
const ModalView = ({usermachine, handlerFunction, handlerFunction2}) => {
  if (usermachine.length == 0)
    return (
      <View style={{flex: 0.9}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#30404d',
          }}>
          예약내역
        </Text>
        <View style={{flex: 2}} />
        <Text>예약내역이 존재하지 않습니다.</Text>
        <Text>이용을 원하시는 기구를 예약해 주세요.</Text>
        <View style={{flex: 5}} />
      </View>
    );
  return (
    <View style={{flex: 0.9}}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#30404d',
        }}>
        예약내역
      </Text>
      <View style={{height: '90%', alignItems: 'center'}}>
        {usermachine.map(item => {
          return (
            <View key={item.id} style={{alignItems: 'center'}}>
              <MachineModal
                name={item.name}
                id={item.id}
                waitnum={item.waitnum}
                handlerFunction={handlerFunction}
                handlerFunction2={handlerFunction2}></MachineModal>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ModalView;
