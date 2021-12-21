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
import Auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    if (!email || !password) {
      Alert.alert("Can't be empty");
      return;
    }
    try {
      await Auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert('Invalid Credicatial');
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
          <Text style={styles.text1}>Please login to continue!</Text>
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

          <Button mode="contained" onPress={() => userLogin()}>
            Login
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.text1}> Don't have an account?</Text>
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

export default LoginScreen;
