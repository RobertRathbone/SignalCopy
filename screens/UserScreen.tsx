import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable,  FlatList } from 'react-native';
import UserItem from '../components/UserItem'

import Users from '../assets/dummy-data/Users'


export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={Users}
        renderItem={({item}) => <UserItem user={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
page: {
  backgroundColor: 'black',
  flex: 1,
},

});
