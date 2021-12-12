import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <View style={styles.box1}>
          <Image
            style={{width: 200, height: 200}}
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

          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Login
          </Button>
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
});

export default LoginScreen;
