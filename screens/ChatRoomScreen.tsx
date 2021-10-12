import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
// import styles from "../components/ChatRoomItem/styles";
import Message from '../components/Message'
import chatRoomData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';
import { useRoute, useNavigation } from "@react-navigation/core";


export default function ChatRoomScreen(){
    const route = useRoute();
    const navigation = useNavigation();

    navigation.setOptions({title: 'Elon Musk'})
    return (
        <SafeAreaView style = {styles.page}>
            <FlatList
                data={chatRoomData.messages}
                renderItem={({ item}) => <Message message ={item} />}
                inverted
                style={{backgroundColor: 'black' }}
                />
                <MessageInput />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
});