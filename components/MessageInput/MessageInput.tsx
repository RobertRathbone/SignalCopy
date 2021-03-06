import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform 
} from "react-native";
import { 
    SimpleLineIcons, 
    Feather, 
    MaterialCommunityIcons, 
    AntDesign, 
    Ionicons 
} from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { Message, ChatRoom } from "../../src/models";


const MessageInput = ({ chatRoom }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        // send Message
        const user = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new Message({
            content: message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);

        setMessage('');
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.lastMessage = newMessage;
        })) 
    }

    const onPlusClicked = () => {
        console.warn('On plus Clicked');
    }

    const onPress = () => {
        if (message) {
            sendMessage();   
        } else {
            onPlusClicked();
        }
    }
    return (
        <KeyboardAvoidingView 
        style={styles.root} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={100}
        >
         <View style={styles.inputContainer}>
             <SimpleLineIcons name="emotsmile" size={24} color='black' style={styles.icon} />
            <TextInput 
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder='Yippy Skippy'
            />
            <Feather name='camera' size={24} color='black'/>
            <MaterialCommunityIcons name='microphone-outline' size={24} color='black' />
         </View>
         <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message ? <Ionicons name ='send' color='black' /> : <AntDesign name='plus' size={24} color='black' />}
         </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'black',
        flexDirection: 'row',
        padding: 10,
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'darkgrey',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    input: {
        height: 20,
        flex: 1,
        marginHorizontal: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#3777f0',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 35,
    },
});

export default MessageInput