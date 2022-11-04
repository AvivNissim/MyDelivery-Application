import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, } from 'react';
import { Input, Icon } from 'react-native-elements';
import { Post } from '../API/Fetch';

const RegisterUserForm = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')


  const signupBtn = async () => {
    if (phoneNumber != '' && firstName != '' && lastName != '' && mail != ''
      && password != '' && city != '' && address != '') {
      let info = {
        Phone_Number: phoneNumber, First_Name: firstName, Last_Name: lastName, Email: mail,
        Password: password, City_Name: city, Address_Name: address
      }
      let user = await Post('api/users/register', info)
      if (user.length > 0)
        navigation.navigate("Login")
    }
    else
      Alert.alert('אופססס..', 'השדות של הטופס ריקים חבוב');
  }

  const moveToLoginBtn = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.inputsView}>
        <Input
          placeholder='מספר טלפון'
          keyboardType='decimal-pad'
          secureTextEntry={false}
          leftIcon={
            <Icon
              name='phone'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setPhoneNumber(txt)}
        />
        <Input
          placeholder='שם פרטי'
          secureTextEntry={false}
          leftIcon={
            <Icon
              name='person'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setFirstName(txt)}
        />
        <Input
          placeholder='שם משפחה'
          secureTextEntry={false}
          leftIcon={
            <Icon
              name='person'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setLastName(txt)}
        />
        <Input
          placeholder='דוא"ל'
          secureTextEntry={false}
          keyboardType='email-address'
          leftIcon={
            <Icon
              name='mail'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setMail(txt)}
        />
        <Input
          placeholder='סיסמה'
          secureTextEntry={true}
          leftIcon={
            <Icon
              name='lock'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setPassword(txt)}
        />
        <Input
          placeholder='עיר'
          secureTextEntry={false}
          leftIcon={
            <Icon
              name='home'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setCity(txt)}
        />
        <Input
          placeholder='כתובת'
          secureTextEntry={false}
          leftIcon={
            <Icon
              name='map'
              size={25}
              color='#FD683D'
            />
          }
          onChangeText={txt => setAddress(txt)}
        />
      </View>
      <View style={styles.registerBtn}>
        <TouchableOpacity onPress={signupBtn}>
          <Text style={styles.btnsText}>הירשם</Text>
        </TouchableOpacity>
      </View>
      <Text> יש לך משתמש?! לחץ כאן להתחברות
      </Text>
      <View style={styles.signupBtn}>
        <TouchableOpacity onPress={moveToLoginBtn} >
          <Text style={styles.signupBtnText}>התחבר!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
    backgroundColor: '#E9E9E9'
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 35,
  },
  switchBtn: {
    alignItems: 'center',
    textAlign: 'center',
    width: '85%',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 30,
  },
  inputsView: {
    width: '85%',
    padding: 10,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 30,
  },
  registerBtn: {
    width: '60%',
    paddingVertical: 10,
    margin: 10,
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2,
  },
  btnsText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  signupBtn: {
    width: '60%',
    alignItems: 'center',
  },
  signupBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
});

export default RegisterUserForm