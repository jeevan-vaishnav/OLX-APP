import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSingup = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all the details');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert('Something went wrong please enter defferent password');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <View style={styles.box1}>
          <Image
            style={{width: 300, height: 150, marginTop: 20}}
            source={require('../assets/olxlogo.png')}
          />
          <Text style={styles.text1}>Please Signup!</Text>
        </View>
        <View style={styles.box2}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />

          <Button mode="contained" onPress={() => userSingup()}>
            Singup
          </Button>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.text1}> Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  box1: {alignItems: 'center'},
  text1: {
    fontSize: 22,
  },
  box2: {
    paddingHorizontal: 40,
    height: '50%',
    justifyContent: 'space-evenly',
  },
  text1: {textAlign: 'center'},
});

export default SignupScreen;
