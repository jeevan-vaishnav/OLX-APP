import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
const AccountScreen = () => {
  const [items, setItems] = useState('');
  const [loading, setLoading] = useState(false);

  const getDetails = async () => {
    const querySnap = await Firestore()
      .collection('ads')
      .where('uuid', '==', Auth().currentUser.uid)
      .get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    setItems(result);
    console.log(Auth().currentUser.uid);
  };

  useEffect(() => {
    getDetails();

    return () => {
      console.log('cleanup');
    };
  }, []);

  const signOut = () => {
    Auth().signOut();
  };

  const renderItem = item => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.image}} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button
            onPress={() => {
              openDial(item.phone);
            }}>
            Call Seller
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.logView}>
        <Text style={{fontSize: 22}}>{Auth().currentUser.email}</Text>
        <Button
          style={{marginHorizontal: 10}}
          mode="contained"
          onPress={() => signOut()}>
          Logout
        </Button>
        <Text style={{fontSize: 22}}>Your Ads!</Text>
      </View>
      <FlatList
        data={[...items].reverse()}
        keyExtractor={item => item.phone}
        renderItem={({item}) => renderItem(item)}
        onRefresh={() => {
          setLoading(true);
          getDetails();
          setLoading(false);
        }}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 2,
  },
  logView: {
    height: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default AccountScreen;
