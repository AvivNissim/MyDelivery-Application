import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import SwitchSelector from "react-native-switch-selector";
import { Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../API/Fetch';



const Login = ({ navigation }) => {

  const [userType, setUserType] = useState(0)
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')


  const CheckLoginInfo = async () => {
    if (mail != '' && password != '') {
      let info = { Email: mail, Password: password }
      let user = (userType === 0) ? await Post('api/users/login', info) : await Post('api/deliveryman/login', info);
      if (user.length > 0) {
        // save the user in async storage
        const currentUser = JSON.stringify(user[0])
        await AsyncStorage.setItem('currentUser', currentUser, () => {
          navigation.navigate(userType === 0 ? 'UserTabs' : 'DeliverymanTabs');
        })
      }
      else {
        Alert.alert('פרטים לא תקינים', 'משתמש לא קיים אנא בדוק את הפרטים או הירשם')
      }
    }
    else
      Alert.alert('אופססס..', 'השדות של הטופס ריקים');
  }

  const signupBtn = async () => {
    navigation.navigate('Register')
  }

  const userKind = (type) => {
    setUserType(type)
  }


  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}> התחברות </Text>
      </View>
      <View style={styles.switchBtn}>
        <SwitchSelector
          onPress={(type) => userKind(type)}
          initial={userType}
          textColor='#000'
          selectedColor='#000'
          buttonColor='#FD683D'
          borderColor="#000"
          backgroundColor='#E9E9E9'
          bold={true}
          fontSize={15}
          options={[
            { label: "משתמש", value: 0 },
            { label: "שליח", value: 1 }
          ]}
        />
      </View>
      <View style={styles.inputsView}>
        <Input
          placeholder='הכנס אימייל'
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
          placeholder='הכנס סיסמה'
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
      </View>
      <View style={styles.loginBtn}>
        <TouchableOpacity onPress={CheckLoginInfo}>
          <Text style={styles.btnsText}>התחבר</Text>
        </TouchableOpacity>
      </View>
      <Text> עדיין לא רשום?!
        לחץ כאן להרשמה
      </Text>
      <View style={styles.signupBtn}>
        <TouchableOpacity onPress={signupBtn}>
          <Text style={styles.signupBtnText}>הירשם!</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 20,
    backgroundColor: '#E9E9E9'
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    padding: 50,
    fontWeight: 'bold',
    fontSize: 35,
  },
  switchBtn: {
    alignItems: 'center',
    textAlign: 'center',
    width: '85%',
    margin: 0,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 30,
  },
  inputsView: {
    marginTop: 30,
    width: '85%',
    marginTop: 70,
    padding: 30,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 30,
  },
  loginBtn: {
    width: '60%',
    paddingVertical: 12,
    margin: 40,
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
    paddingVertical: 5,
    alignItems: 'center',
  },
  signupBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
});

export default Login