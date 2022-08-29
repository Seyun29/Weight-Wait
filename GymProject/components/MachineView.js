import {loadPartialConfig} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
  Text,
} from 'react-native';
import Machine from './Machine.js';

const MachineView = ({machine, change1, handlerFunction}) => {
  const change2 = change1;
  function handleChange() {
    handlerFunction();
    console.log('handlechange()');
  }
  const [newmachine, setMachine] = useState(
    machine.sort(function (a, b) {
      return a.waitnum - b.waitnum;
    }),
  );
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

  useEffect(() => {}, [machine]);

  useEffect(() => {
    makesort(sort_cur);
  }, [category, sort_cur]);

  return (
    <View style={{flex: 7}}>
      <View style={styles.categoryView}>
        {category === 0 ? (
          <Button title="ALL" color={'blue'} />
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
          <Button title="상체" color={'blue'} />
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
          <Button title="하체" color={'blue'} />
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
          <Button title="유산소/기타" color={'blue'} />
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
        />
      </View>

      <View style={styles.seperator}></View>

      <View style={styles.scrollView}>
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={{flex: 1}}>
            {newmachine.map(item => {
              return (
                <View key={item.id}>
                  <Machine
                    id={item.id}
                    name={item.name}
                    waitnum={item.waitnum}
                    change2={change2}
                    handlerFunction={handleChange}></Machine>
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
    backgroundColor: 'black',
    marginVertical: 10,
  },
  categoryView: {
    flex: 0.6,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortView: {flex: 0.6, flexDirection: 'row', marginLeft: 10},
  scrollView: {flex: 6, backgroundColor: 'white'},
});

export default MachineView;
