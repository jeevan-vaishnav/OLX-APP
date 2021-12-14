import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const CreateAdScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Ad!</Text>
      <TextInput
        label="Ad title"
        mode="outlined"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Describe what you are selling"
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        value={desc}
        onChangeText={text => setDesc(text)}
      />
      <TextInput
        label="year of purchase"
        mode="outlined"
        numberOfLines={3}
        keyboardType="numeric"
        value={year}
        onChangeText={text => setYear(text)}
      />
      <TextInput
        label="price in INR"
        mode="outlined"
        keyboardType="numeric"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <TextInput
        label="your contact number"
        mode="outlined"
        keyboardType="numeric"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        upload image
      </Button>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Post
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 30, justifyContent: 'space-evenly'},
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default CreateAdScreen;
