import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable,  FlatList } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem'
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from '../src/models';


export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chRooms = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub)
      .map((chatRoomUser) => chatRoomUser.chatroom)
      setChatRooms(chRooms);
      console.log('ChatRooms', chRooms)
    };
    fetchChatRooms();
  }, []);

  const logOut = () => {
    Auth.signOut();
  }
  
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
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
