import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import HomeScreen0 from './HomeScreen0.js';
import HomeScreen0tmp from './HomeScreen0tmp.js';
import HomeScreen1 from './HomeScreen1.js';
import HomeScreen1tmp from './HomeScreen1tmp.js';
import HomeScreen2 from './HomeScreen2.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({logged}) => {
  if (!logged) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF8F3',
        }}>
        <Text>로그인 후 정상적으로 이용 가능합니다.</Text>
        <Text>하단의 '계정관리' 탭을 눌러 로그인해주세요.</Text>
        <View style={{height: '50%'}} />
      </SafeAreaView>
    );
  } else {
    const [casenum, setCaseNum] = useState(3);
    const [userid, setUserid] = useState(null);
    const [availlist, setAvailList] = useState([
      {machineid: null, machinename: null, availabletime: null, image: null},
    ]);
    const [usinginfo, setUsingInfo] = useState({
      machineid: null,
      machinename: null,
      time: null,
    });
    const [change, setChange] = useState(0);
    const handler = () => {
      console.log('handle');
      setChange(change + 1);
    };

    const getuserid = async () => {
      const value = await AsyncStorage.getItem('@storage_userid');
      if (value !== null) {
        setUserid(value);
        return value;
      } else {
        setUserid(null);
        return null;
      }
    };
    getuserid();

    const checkuser = async () => {
      const usid = await getuserid();
      if (usid !== null) {
        console.log(usid);

        const url =
          'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/checkuser?userid=' +
          usid;
        const resul = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            if (json.usinginfo.length !== 0) {
              //사용하고 있는 기구가 있는 경우
              setCaseNum(0);
              let macid = Number(json.usinginfo[0]);
              let macname = json.usinginfo[1];
              let starttime = json.usinginfo[2];
              let currentmachine = {
                machineid: macid,
                machinename: macname,
                time: starttime,
              };
              setUsingInfo(currentmachine);
              return;
            } else if (json.availinfo.length !== 0) {
              //사용하고 있는 기구는 없는데 현재 이용가능한 기구가 있는 경우
              setCaseNum(1);
              let availablelist1 = [];
              for (let i = 0; i < json.availinfo.length; i++) {
                let macid1 = Number(json.availinfo[i][0]);
                let macname1 = json.availinfo[i][1];
                let availabletime1 = json.availinfo[i][2];
                let image1 = json.availinfo[i][3];
                let object1 = {
                  machineid: macid1,
                  machinename: macname1,
                  availabletime: availabletime1,
                  image: image1,
                };
                availablelist1.push(object1);
              }
              setAvailList(availablelist1);
              return;
            } else {
              //사용하고 있는 기구도 없고 현재 이용가능한 기구도 없는 경우
              console.log('-1');
              setCaseNum(2);
              return;
            }
          })
          .catch(error => {
            console.error(error);
            setCaseNum(2);
            return;
          });
        return;
      } else handler();
    };

    useEffect(() => {
      setTimeout(() => {
        checkuser();
      }, 500);
    }, [change]);
    /*
    useInterval(() => {
      await checkuser();
      console.log(userid);
      console.log('interval');
    }, 3000); //주기적인 refresh 선언,,
    */

    //casenum = 0: 이용중인기구있음, 1: 이용중인기구없음&이용가능기구존재, 2: 이용중인기구없음&이용가능기구없음
    if (casenum === 0) {
      //이용중인기구있음
      /*machineid: macid,
              machinename: macname,
              time: starttime,
    */
      console.log('using:', usinginfo);
      if (usinginfo.time == null)
        return (
          <SafeAreaView style={styles.baseview}>
            <HomeScreen0tmp />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                color: 'grey',
              }}>
              아래로 당겨서 새로고침
            </Text>
            <View style={{flex: 0.1}} />
          </SafeAreaView>
        );
      return (
        <SafeAreaView style={styles.baseview}>
          <HomeScreen0
            id={usinginfo.machineid}
            name={usinginfo.machinename}
            time={usinginfo.time}
            handler={handler}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              color: 'grey',
            }}>
            아래로 당겨서 새로고침
          </Text>
          <View style={{flex: 0.1}} />
        </SafeAreaView>
      );
    } else if (casenum === 1) {
      //이용중인기구없음&이용가능기구존재
      /*machineid: macid1,
                machinename: macname1,
                availabletime: availabletime1,
                image: image1 */
      console.log('avail:', availlist);
      if (availlist[0].machinename === null)
        return (
          <SafeAreaView style={styles.baseview}>
            <HomeScreen1tmp />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                color: 'grey',
              }}>
              아래로 당겨서 새로고침
            </Text>
            <View style={{flex: 0.1}} />
          </SafeAreaView>
        );
      return (
        <SafeAreaView style={styles.baseview}>
          <HomeScreen1 list={availlist} handler={handler} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              color: 'grey',
            }}>
            아래로 당겨서 새로고침
          </Text>
          <View style={{flex: 0.1}} />
        </SafeAreaView>
      );
    } else if (casenum === 2) {
      //이용중인기구없음&이용가능기구없음
      return (
        <SafeAreaView style={styles.baseview}>
          <HomeScreen2 handlerFunction={handler} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              color: 'grey',
            }}>
            아래로 당겨서 새로고침
          </Text>
          <View style={{flex: 0.1}} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#FFF8F3',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.2}} />
          <Text style={styles.text}>로딩중입니다</Text>
          <View style={{flex: 0.02}} />
          <Text style={styles.text}>잠시만 기다려주세요</Text>
          <View style={{flex: 0.4}} />
        </SafeAreaView>
      );
    }
  }
};
const styles = StyleSheet.create({
  baseview: {flex: 1, backgroundColor: '#FFF8F3'},
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
});

export default HomeScreen;
