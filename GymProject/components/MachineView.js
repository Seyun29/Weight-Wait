import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
  Text
} from 'react-native';
import Machine from '../components/Machine.js';

const MachineView = ({machine}) => {
    const [newmachine, setMachine] = useState(machine);
    const [category, setCategory] = useState(0);
    const clicked=(category)=>{
        if (category == 0){
            setMachine(machine);
        }
        else{
            let tmpmachine = [];
            for(var i = 0; i<machine.length; i++){
                if (machine[i].category == category)
                    tmpmachine.push(machine[i]);
            }
            setMachine(tmpmachine);
        }
        setCategory(category);
    }
    return (
    <View style={{flex:7}}>
              <View style={styles.categoryView}>
                {category == 0 ? <Button title="ALL" color={'blue'} /> : <Button title="ALL" color={'grey'} onPress={()=>{clicked(0)}}/>}
                {category == 1 ? <Button title="상체" color={'blue'} /> : <Button title="상체" color={'grey'} onPress={()=>{clicked(1)}}/>}
                {category == 2 ? <Button title="하체" color={'blue'} /> : <Button title="하체" color={'grey'} onPress={()=>{clicked(2)}}/>}
                {category == 3 ? <Button title="유산소/기타" color={'blue'} /> : <Button title="유산소/기타" color={'grey'} onPress={()=>{clicked(3)}}/>}
              </View>

              <View style={styles.seperator}></View>

              <View style={styles.sortView}>
                <Button title="정렬 : 대기 많은 순"/>
              </View>

              <View style={styles.seperator}></View>

              <View style={styles.scrollView}>
              <ScrollView style={{backgroundColor:'white'}}>
              <View style={{flex:1}}>
                {newmachine.map(item => {
                  return (
                    <View>
                      <Machine
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        waitnum={item.waitnum}></Machine>
                    </View>
                  );
                })}
              </View>
              </ScrollView>
              </View>
    </View>
    );
}

MachineView.defaultProps = {
    machine : []
}

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