import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Firestore from '@react-native-firebase/firestore';
import {useState} from 'react/cjs/react.development';

const ListItemScreen = () => {
  const [items, setItems] = useState('');
  const [loading, setLoading] = useState(false);

  const myitems = [
    {
      name: 'iPhone',
      year: '2013',
      phone: '123456781',
      image:
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      desc: 'Iam seling this i phone wwwwwwwwwwwwwww',
    },
    {
      name: 'Iphone4',
      year: '2014',
      phone: '12345678',
      image:
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      desc: 'Iam seling this i phone wwwwwwwwwwwwwww',
    },
    {
      name: 'Iphone3',
      year: '2014',
      phone: '123456787',
      image:
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      desc: 'Iam seling this i phone wwwwwwwwwwwwwww',
    },
  ];

  //fetch details from firebase
  const getAdDetails = async () => {
    const querySnap = await Firestore().collection('ads').get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    console.log(result);
    setItems(result);
  };

  const openDial = phone => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  //network connection
  useEffect(() => {
    getAdDetails();
    return () => {
      console.log('cleanup');
    };
  }, []);

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
      <FlatList
        data={[...items].reverse()}
        keyExtractor={item => item.phone}
        renderItem={({item}) => renderItem(item)}
        onRefresh={() => {
          setLoading(true);
          getAdDetails();
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
});

export default ListItemScreen;
