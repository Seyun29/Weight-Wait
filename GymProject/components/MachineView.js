import {loadPartialConfig} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import Machine from './Machine.js';

const MachineView = ({machine, handlerFunction}) => {
  const [newmachine, setMachine] = useState([]);
  const [category, setCategory] = useState(0);
  const [sort_cur, setSortcur] = useState(0); //정렬방식, 0 : 대기 적은순, 1 : 대기 많은순, 2 : 이름순
  const [sort_text, setSorttext] = useState('정렬 : 대기 적은 순');
  const makesort = sortmode => {
    let tmp = [...newmachine];
    switch (sortmode) {
      case 0:
        setMachine(newmachine => {
          return tmp.sort(function (a, b) {
            return a.waitnum - b.waitnum;
          });
        });
        break;
      case 1:
        setMachine(newmachine => {
          return tmp.sort(function (a, b) {
            return b.waitnum - a.waitnum;
          });
        });

        break;
      case 2:
        setMachine(newmachine => {
          return tmp.sort(function (a, b) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          });
        });
        break;
      default:
        break;
    }
  };
  const sortclicked = () => {
    //sort버튼 onclick 함수
    if (sort_cur === 0) {
      setSorttext(sort_text => '정렬 : 대기 많은 순');
      setSortcur(sort_cur => 1);
    } else if (sort_cur === 1) {
      setSorttext(sort_text => {
        return '정렬 : 이름순';
      });
      setSortcur(sort_cur => 2);
    } else {
      setSorttext(sort_text => {
        return '정렬 : 대기 적은 순';
      });
      setSortcur(sort_cur => 0);
    }
  };
  const clicked = categ => {
    //카테고리 선택 버튼 onclick 함수
    setCategory(categ);
    if (categ === 0) {
      setMachine(machine);
    } else {
      let tmpmachine = [];
      for (var i = 0; i < machine.length; i++) {
        if (machine[i].category === categ) tmpmachine.push(machine[i]);
      }
      setMachine(tmpmachine);
    }
  };
  useEffect(()=>{
  setMachine(machine.sort(function (a, b) {
                   return a.waitnum - b.waitnum;
                 }),);
  },);
  useEffect(() => {
    makesort(sort_cur);
  }, [category, sort_cur]);

  //console.log('category :', category); //category 는 정상적으로 전달이 되는데,, 0903,,
  //0903 - 일단
  const [refresh, setRefresh] = useState(false);
  //요거 어떻게 쓰는거임?
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    handlerFunction();
    wait(500).then(() => setRefresh(false));
  }, []);

  return (
    <View style={{flex: 7}}>
      <View style={styles.categoryView}>
        {category === 0 ? (
          <Button title="ALL" color={'#d38657'} />
        ) : (
          <Button
            title="ALL"
            color={'grey'}
            onPress={() => {
              clicked(0);
            }}
          />
        )}
        {category === 1 ? (
          <Button title="상체" color={'#d38657'} />
        ) : (
          <Button
            title="상체"
            color={'grey'}
            onPress={() => {
              clicked(1);
            }}
          />
        )}
        {category === 2 ? (
          <Button title="하체" color={'#d38657'} />
        ) : (
          <Button
            title="하체"
            color={'grey'}
            onPress={() => {
              clicked(2);
            }}
          />
        )}
        {category === 3 ? (
          <Button title="유산소/기타" color={'#d38657'} />
        ) : (
          <Button
            title="유산소/기타"
            color={'grey'}
            onPress={() => {
              clicked(3);
            }}
          />
        )}
      </View>

      <View style={styles.seperator}></View>

      <View style={styles.sortView}>
        <Button
          title={sort_text}
          onPress={() => {
            sortclicked();
          }}
          color={'#d38657'}
        />
      </View>

      <View style={{height: 9}}></View>

      <View style={styles.scrollView}>
        <ScrollView
          style={{backgroundColor: '#FFF8F3'}}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={['#d38657']}
            />
          }>
          <View style={{flex: 1}}>
            {newmachine.map(item => {
              return (
                <View key={item.id}>
                  <Machine
                    id={item.id}
                    name={item.name}
                    waitnum={item.waitnum}
                    image={item.image}
                    handlerFunction={handlerFunction}></Machine>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

MachineView.defaultProps = {
  machine: [],
};

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#d38657',
    marginVertical: 7,
  },
  categoryView: {
    flex: 0.6,
    backgroundColor: '#FFF8F3',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortView: {
    flex: 0.6,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    flex: 6,
    backgroundColor: '#FFF8F3',
    borderTopColor: '#d38657',
    borderTopWidth: 1,
  },
});

export default MachineView;
