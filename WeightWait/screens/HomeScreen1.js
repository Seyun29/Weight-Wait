import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import MachineHome from '../components/MachineHome.js';

//이용가능한 기구리스트 띄워주기, 각 기구별로 ‘이용 시작’ 가능시간까지 남은 시간 띄워주기, ‘이용시작’ button 구현.
//밑의 내용을 리스트 형식으로 구현, 인당 최대 예약이 3개인 점 고려.

const HomeScreen1 = ({list, today, handler}) => {
  /*
<Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
*/
  const [refresh, setRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    handler();
    setRefresh(false);
  });
  return (
    <ScrollView
      contentContainerStyle={styles.baseview}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={['orange']}
        />
      }>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.bigtext}>현재 이용중인 기구가 없습니다</Text>
        <Text> </Text>
        <Text style={styles.mediumtext}>
          아래에서 이용하실 기구를 선택하세요
        </Text>
      </View>
      <View style={{flex: 3}}>
        {list.map(item => {
          return (
            <View key={item.machineid}>
              <MachineHome
                id={item.machineid}
                name={item.machinename}
                time={item.availabletime}
                image={item.image}
                today={today}
                handler={handler}></MachineHome>
            </View>
          );
        })}
        <Text> </Text>
        <Text style={{color: 'grey'}}>
          {
            '   *주의 : 3분이 경과되어도 이용을 시작하지 않으면\n     다음 대기자에게 순서가 넘어갑니다.'
          }
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseview: {flex: 1, backgroundColor: '#FFF8F3'},
  mediumtext: {fontSize: 20, textAlign: 'center', color: 'black'},
  bigtext: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default HomeScreen1;
