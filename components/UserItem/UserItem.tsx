import { userInfo } from "os";
import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import styles from './styles';
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";

export default function UserItem({ user }) {
  
    const navigation = useNavigation();
  
    const onPress = async () => {
      // Create a chat room
        const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}))

        // connect Authenticated user with the ChatRoom
        const authUser = await Auth.currentAuthenticatedUser();
        const dbUser = await DataStore.query(User, authUser.attributes.sub);
        await DataStore.save(new ChatRoomUser({ 
            user: dbUser,
            chatroom: newChatRoom,
        }));

        // connect clicked user with the ChatRoom
        await DataStore.save(new ChatRoomUser({ 
            user,
            chatroom: newChatRoom,
        }));

        navigation.navigate('ChatRoom', { id: newChatRoom.id});
    }
  
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{ uri: user.imageUri }} style={styles.image} />
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </View>
        </Pressable>
    );
}