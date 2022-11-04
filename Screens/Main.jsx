import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Main = ({navigation}) => {

  const signinBtn = () => {
    navigation.navigate('Login')
  }

  const signupBtn = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Image
          style={styles.image}
          source={require("../assets/images/main_screen.png")}
        />
      </View>
      <View style={{ width: '100%' }}>
        <Text style={{ textAlign:'center', fontWeight:'bold', fontSize: 28, paddingTop: 40 }}> משלוח עד הדלת שלך </Text>
        <Text style={{ textAlign:'center', fontSize: 14, paddingTop: 15 }}> המשלוח שלנו יבטיח שהפריטים שלך יימסרו ממש עד הדלת </Text>
        <View style={styles.BtnsView}>
          <TouchableOpacity style={styles.createAccountBtn} onPress={signupBtn} >
            <Text style={styles.btnsText}>צור חשבון</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signinBtn} onPress={signinBtn} >
            <Text style={styles.btnsText}>התחבר</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 350,
  },
  BtnsView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:60
  },
  createAccountBtn: {
    width: '90%',
    paddingVertical: 12,
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 30,
  },
  signinBtn: {
    width: '90%',
    paddingVertical: 12,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2
  },
  btnsText: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default Main