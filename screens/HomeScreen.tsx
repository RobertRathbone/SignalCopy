import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable,  FlatList } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem'
import { Auth } from 'aws-amplify';

import chatRoomsData from '../assets/dummy-data/ChatRooms'

const logOut = () => {
  Auth.signOut();
}

export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRoomsData}
        renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}
      />
      <Pressable onPress={logOut} style={{ color: 'white', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', height: 30, margin: 150, borderRadius: 15}}>
      <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
page: {
  backgroundColor: 'black',
  flex: 1,
},

});
