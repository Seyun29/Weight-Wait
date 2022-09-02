import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import MachineModal from './MachineModal.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
//usermachine : name, id, waitnum
//machine component(이미지, name, waitnum, 예약 취소 버튼)도 띄워줘야함
const ModalView = ({
  usermachine,
  handlerFunction,
  handlerFunction2,
}) => {

    return (
      <View>
        <Text>나의 예약내역</Text>
        {usermachine.map(item => {
          return (
            <View key={item.id}>
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
    );

};

const styles = StyleSheet.create({});
export default ModalView;
