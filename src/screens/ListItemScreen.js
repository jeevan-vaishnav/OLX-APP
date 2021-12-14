import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const ListItemScreen = () => {
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
      name: 'Ihpne2',
      year: '2014',
      phone: '12345678',
      image:
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      desc: 'Iam seling this i phone wwwwwwwwwwwwwww',
    },
  ];

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
          <Button>200</Button>
          <Button>Call Seller</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={myitems}
        keyExtractor={item => item.phone}
        renderItem={({item}) => renderItem(item)}
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
