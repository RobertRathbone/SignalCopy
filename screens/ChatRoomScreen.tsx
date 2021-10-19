import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
// import styles from "../components/ChatRoomItem/styles";
import MessageComponent from '../components/Message'
import { DataStore, SortDirection } from "aws-amplify";
import MessageInput from '../components/MessageInput';
import { Message } from '../src/models';
import { ChatRoom } from "../src/models";
import { useRoute, useNavigation } from "@react-navigation/core";


export default function ChatRoomScreen(){
    const [messages, setMessages] =useState<Message[]>([]);
    const [chatRoom, setChatRoom] =useState<ChatRoom | null>(null);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        fetchChatRoom();
    }, []);

    useEffect(() => {
        fetchMessages();
    },[chatRoom])

    const fetchChatRoom = async () => {
        if (!route.params?.id) {
            console.warn('Let me check your id.');
            return;
        }
        const chatRoom = await DataStore.query(ChatRoom, route.params.id);
        if (!chatRoom) {
            console.error('Fake id, dude.');
        } else {
            setChatRoom(chatRoom);
        }
        };
        console.log('Chat Room Screen', chatRoom);
    
    const fetchMessages = async () => {
        if (!chatRoom) {
            return;
        }
        const fetchedMessages = await DataStore.query(Message, 
            message => message.chatroomID('eq', chatRoom?.id),
            {
                sort: message => message.createdAt(SortDirection.DESCENDING)
            });
        setMessages(fetchedMessages);
    }

    navigation.setOptions({title: 'Chat Room Screen'})

    if (!chatRoom) {
        return <ActivityIndicator />
    }

    return (
        <SafeAreaView style = {styles.page}>
            <FlatList
                data={messages}
                renderItem={({ item}) => <MessageComponent message ={item} />}
                inverted
                style={{backgroundColor: 'black' }}
                />
                <MessageInput chatRoom={chatRoom}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
});