import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable,  FlatList } from 'react-native';
import { DataStore } from 'aws-amplify';
import UserItem from '../components/UserItem'
import { User } from '../src/models';


export default function UserScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  })

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
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
