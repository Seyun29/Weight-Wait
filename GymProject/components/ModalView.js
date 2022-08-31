import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import MachineModal from './MachineModal.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
//usermachine : name, id, waitnum
//machine component(이미지, name, waitnum, 예약 취소 버튼)도 띄워줘야함
const ModalView = ({isreserved, usermachine, change1, handlerFunction}) => {
  const change2 = change1;
  function handleChange() {
    handlerFunction();
    console.log('handlechange()');
  }
  
  /*if (isreserved)*/ {
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
                  change2={change2}
                  handlerFunction={handleChange}></MachineModal>
              </View>
            );
          })}
        </View>
      );  // isreserved가 값을 받아올 때 느려서 false가 들어와서 이렇게 바꿈..!
    
  } /*else {
    return (
      <View>
        <Text>현재 예약중인 기구가 없습니다</Text>
      </View>
    );
  }*/
};

const styles = StyleSheet.create({});
export default ModalView;
