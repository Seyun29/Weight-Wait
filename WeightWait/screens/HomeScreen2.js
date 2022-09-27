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

const HomeScreen2 = ({handlerFunction}) => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    handlerFunction();
    setRefresh(false);
  });
  return (
    <ScrollView
      contentContainerStyle={styles.baseview}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={['#d38657']}
        />
      }>
      <View style={{flex: 0.2}} />
      <Text style={styles.text}>현재 이용가능한 기구가 없습니다</Text>
      <View style={{flex: 0.05}} />
      <Text style={styles.text}>예약한 기구가 이용가능할 경우</Text>
      <Text style={styles.text}>푸시알림을 보내드립니다.</Text>
      <View style={{flex: 0.4}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F3',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#30404d',
  },
});

export default HomeScreen2;
