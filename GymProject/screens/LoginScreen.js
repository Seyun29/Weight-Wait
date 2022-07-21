import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';

const LoginScreen = () => {
  const [id, SetId] = useState('');
  const [pw, SetPw] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.block1}>
          <Text style={styles.text}>Log In</Text>
        </View>
        <View style={styles.inputblock}>
          <TextInput
            placeholder="ID를 입력하세요."
            style={styles.input}
            onChangeText={value => SetId(value)}
          />
        </View>
        <View style={{height: 20}} />
        <View style={styles.inputblock}>
          <TextInput
            placeholder="비밀번호를 입력하세요."
            style={styles.input}
            onChangeText={value => SetPw(value)}
            secureTextEntry
          />
        </View>
        <View style={{height: 40, marginTop: 40, flexDirection: 'row'}}>
          <Button title="로그인" color="#bdbdbd" />
          <View style={{width: '30%'}} />
          <Button title="회원가입" color="#bdbdbd" />
        </View>
        <View
          style={{
            height: 40,
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontStyle: 'italic'}}>
            관리자이신가요?
          </Text>
          <View style={{width: '15%'}} />
          <Button title="관리자로 로그인" />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  block1: {flex: 0.7, alignItems: 'center', justifyContent: 'center'},
  inputblock: {
    height: '6%',
    width: '90%',
    paddingHorizontal: 15,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {fontSize: 48, fontWeight: 'bold', color: 'black'},
  input: {fontSize: 20, paddingVertical: 8},
}); //수정예정
export default LoginScreen;
