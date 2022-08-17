import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // add this 8/8
import Icon from 'react-native-vector-icons/AntDesign';

//현재는 기구명, 대기인원만 표시되지만, 이미지도 추후 추가할것

const Machine = ({name, id, waitnum}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  const [visible2, setVisible2] = useState(false); //예약하기 클릭시 팝업제어용
  const [inputtime, setInputTime] = useState('');

  const reserve = (machineid, usetime) => {
    //석우꺼
    /*예약하기버튼, 서버에 회원id랑 예약하고자 하는 머신id, 예상 사용시간주고 성공 or 실패 여부 리턴받기*/
    //인자로 받은 machine id 변수 -> 예약하고자하는 머신id, 인자로 받은 usetime -> 사용시간 (numeric type)
    const getuserid = async () => {
      try {
        const id1 = await AsyncStorage.getItem('@storage_userid');
        console.log(id1);
        if (id1 !== null) {
          fetch(
            'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userid: id1,
                machineid: '1',
              }),
            },
          )
            .then(response => response.json())
            .then(json => {
              console.log(json);
              Alert.alert(JSON.stringify(json));
              return json;
            })
            .catch(error => {
              console.error(error);
            });
          // value previously stored
        }
      } catch (e) {
        console.log('-1');
        // error reading value
      }
    }; // add this 8/8
    getuserid(); // add this 8/8

    return;
  };

  const onReserve = (id, time) => {
    const waitnum = reserve(id, time);
    if (waitnum >= 0) {
      const formatted = `${waitnum}번재로 예약성공`;
      Alert.alert(formatted);
    } else {
      Alert.alert('예약실패');
    }
  };

  const strformat = '예상 사용시간 입력 후\n하단 버튼을 클릭해주세요.';
  return (
    <View style={styles.machine}>
      <Modal transparent={true} visible={visible2} animationType="slide">
        {/*팝업 확인용, visible = {visible2}로 변경해줘야함*/}
        <KeyboardAvoidingView style={{flex: 1}} enabled={false}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    height: '15%',
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Icon name={'closecircle'} size={20} />
                </View>
                <Text style={styles.text}>{strformat}</Text>
                <View style={{height: '10%'}} />
                <View style={styles.inputandbutton}>
                  <View style={styles.inputblock}>
                    <TextInput
                      placeholder="분 단위로 입력 (ex. 30)" //keyboard나올때 숫자만 나오도록하기
                      //keyboard나올때 keyboardavoidingview사용해야할듯
                      style={styles.input}
                      onChangeText={value => setInputTime(value)}
                      //여기서 받은 'time'변수는 string이므로 int형으로 변경해서 전달
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{width: '20%'}} />
                  <Button
                    title="예약하기"
                    onPress={() => {
                      let tmp = inputtime;
                      tmp *= 1; //numeric으로 형변환
                      onReserve(id, tmp);
                      setVisible2(false);
                    }}></Button>
                  {/*예약 후 Alert로 전달*/}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약하기" onPress={() => setVisible2(true)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  machine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '50%',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 20,
  },
  inputandbutton: {
    flex: 0.5,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputblock: {
    height: '90%',
    paddingHorizontal: 15,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  input: {fontSize: 11, paddingVertical: 8},
  text: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
});
export default Machine;
