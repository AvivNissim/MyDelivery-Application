import { View, Text, StyleSheet, } from 'react-native';
import React, { useState, } from 'react';
import SwitchSelector from "react-native-switch-selector";
import RegisterUserForm from '../Components/RegisterUserForm';
import RegisterDeliverymanForm from '../Components/RegisterDeliverymanForm';

const Register = ({ navigation }) => {

  const [userType, setUserType] = useState(0)


  const userKind = (type) => {
    setUserType(type)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}> הרשמה </Text>
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
        {userType == 0 ? <RegisterUserForm navigation={navigation}/> : <RegisterDeliverymanForm navigation={navigation}/>}
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
    marginTop: 5,
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
    marginTop: 10,
    width: '100%',
    padding: 10,
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
    paddingVertical: 5,
    alignItems: 'center',
  },
  signupBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
});

export default Register