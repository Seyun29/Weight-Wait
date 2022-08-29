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
import useInterval from '../hooks/useInterval.js'

const MachineHome = ({name, id, time, image, today}) => {
//image경로문제 해결해야함.
    let s_min = time.substr(0,2);
    s_min = s_min/1; //정수변환
    let s_sec = time.substr(2,2);
    s_sec = s_sec/1; //정수변환

    const min = today.getMinutes();
    const sec = today.getSeconds();
    let dif_min = min-s_min;

    if (min-s_min < 0)
        dif_min = dif_min+60;
    let dif_sec = sec-s_sec;
    if (sec-s_sec<0)
        dif_sec = dif_sec+60;

    const [gap, setGap] = useState( 180 - (dif_min*60 + dif_sec));
    useInterval(()=>{setGap(gap-1);},1000);
    const formatted2 = `기구명 : ${name}\n\n이용까지 남은시간 : ${parseInt(gap/60)}분 ${gap%60}초`;
    const formatted3 = `기구명 : ${name}\n\n이용까지 남은시간 : 이용불가`
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 90, height: 90}}></Image>
      {gap<0 ? (<Text>{formatted3}</Text>) :
      (<Text>{formatted2}</Text>)
      }
      <Button title={"이용시작"} color={'orange'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  machine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
});

export default MachineHome;