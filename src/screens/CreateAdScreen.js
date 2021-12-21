import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  //post data
  const postData = async () => {
    //entered data is null
    if (!name || !desc || !year || !price || !phone || !image) {
      Alert.alert("Can't be empty !! fill the details ");
      return;
    }

    try {
      await Firestore().collection('ads').add({
        name,
        desc,
        year,
        price,
        phone,
        image,
        uuid: auth().currentUser.uid,
      });
      Alert.alert('Posted you ad!');
      setName('');
      setDesc('');
      setPhone('');
      setYear('');
      setPrice('');
      setImage('');
    } catch (error) {
      Alert.alert('Something went wrong. try again');
    }
  };

  const openCamera = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progress == 100) {
            alert('Uploaded');
          }
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused');
          //     break;
          //   case 'running':
          //     console.log('Upload is running');
          //     break;
          // }
        },
        error => {
          // Handle unsuccessful uploads
          alert('something went wrong');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

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
      <Button icon="camera" mode="contained" onPress={() => openCamera()}>
        upload image
      </Button>
      <Button
        disabled={image ? false : true}
        mode="contained"
        onPress={() => postData()}>
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
