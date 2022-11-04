import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Icon, Input } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Put } from '../../API/Fetch';

const DeliverymanProfile = () => {

  const [id, setId] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [idNum, setIdNum] = useState('')
  const [drivingLicense, setDrivingLicense] = useState('')
  const [editToggle, SetEditToggle] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    mail: false,
    password: false,
    idNum: false,
    drivingLicense: false
  })


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('currentUser')
      let currentUser = jsonValue ? JSON.parse(jsonValue) : null;
      if (currentUser && currentUser != null) {
        setFirstName(currentUser.First_Name)
        setLastName(currentUser.Last_Name)
        setPhoneNumber(currentUser.Phone_Number)
        setMail(currentUser.Email)
        setPassword(currentUser.Password)
        setIdNum(currentUser.Id_Num)
        setDrivingLicense(currentUser.Driving_License)
        setId(currentUser.Id)
      }
    } catch (e) {
      // error reading value
      Alert.alert("Can't get current user")
    }
  }


  useFocusEffect(useCallback(() => {
    getData();
  }, []));


  const updateDetails = async () => {
    let info = {
      First_Name: firstName,
      Last_Name: lastName,
      Phone_Number: phoneNumber,
      Email: mail,
      Password: password,
      Id_Num: idNum,
      Driving_License: drivingLicense,
      Id: id
    }
    let res = await Put("api/users/edit", info)
    if (res && res !== null){
      await AsyncStorage.setItem('currentUser', JSON.stringify(res))
      Alert.alert('הפרטים נשמרו בהצלחה')
    } else {
      Alert.alert('הפרטים לא נשמרו בהצלחה')
    }
  }


  return (
    <ScrollView>
      <View style={styles.container}>

        <View>
          <Text style={styles.title}> הפרופיל שלי </Text>
        </View>
        <Text style={{ padding: 10, fontSize: 16, width: '100%', textAlign: 'center' }}> לחץ על השדה שתרצה לערוך ולאחר מכן על כפתור השמירה שלמטה </Text>
        <View style={styles.detailsContainerView}>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}> שם פרטי: </Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, firstName: !prev.firstName }))}>
                {!editToggle.firstName && <Text style={styles.detail}> {firstName}</Text>}
              </TouchableOpacity>
              {editToggle.firstName && <Input onChangeText={(txt) => { setFirstName(txt) }} style={styles.editInput} defaultValue={firstName}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, firstName: !prev.firstName }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}> שם משפחה: </Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, lastName: !prev.lastName }))}>
                {!editToggle.lastName && <Text style={styles.detail}> {lastName}</Text>}
              </TouchableOpacity>
              {editToggle.lastName && <Input onChangeText={(txt) => { setLastName(txt) }} style={styles.editInput} defaultValue={lastName}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, lastName: !prev.lastName }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}>מספר טלפון:</Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, phoneNumber: !prev.phoneNumber }))}>
                {!editToggle.phoneNumber && <Text style={styles.detail}> {phoneNumber}</Text>}
              </TouchableOpacity>
              {editToggle.phoneNumber && <Input onChangeText={(txt) => { setPhoneNumber(txt) }} keyboardType='decimal-pad' style={styles.editInput} defaultValue={phoneNumber}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, phoneNumber: !prev.phoneNumber }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}>דוא"ל:</Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, mail: !prev.mail }))}>
                {!editToggle.mail && <Text style={styles.detail}> {mail}</Text>}
              </TouchableOpacity>
              {editToggle.mail && <Input onChangeText={(txt) => { setMail(txt) }} keyboardType='email-address' style={styles.editInput} defaultValue={mail}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, mail: !prev.mail }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}>סיסמה:</Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, password: !prev.password }))}>
                {!editToggle.password && <Text style={styles.detail}> {password}</Text>}
              </TouchableOpacity>
              {editToggle.password && <Input onChangeText={(txt) => { setPassword(txt) }} style={styles.editInput} defaultValue={password} secureTextEntry={true}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, password: !prev.password }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}>מספר ת"ז:</Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, idNum: !prev.idNum }))}>
                {!editToggle.city && <Text style={styles.detail}> {idNum}</Text>}
              </TouchableOpacity>
              {editToggle.city && <Input onChangeText={(txt) => { setCity(txt) }} style={styles.editInput} defaultValue={idNum}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, idNum: !prev.idNum }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
          <View style={styles.detailBlock}>
            <View>
              <Text style={styles.subTitle}>מס' רישיון נהיגה:</Text>
              <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, drivingLicense: !prev.drivingLicense }))}>
                {!editToggle.address && <Text style={styles.detail}> {drivingLicense}</Text>}
              </TouchableOpacity>
              {editToggle.address && <Input onChangeText={(txt) => { setAddress(txt) }} style={styles.editInput} defaultValue={drivingLicense}
                rightIcon={
                  <TouchableOpacity style={styles.icons} onPress={() => SetEditToggle((prev) => ({ ...prev, drivingLicense: !prev.drivingLicense }))}>
                    <Icon
                      name='save'
                      size={27}
                      color='#FD683D'
                    />
                  </TouchableOpacity>
                } />}
            </View>
          </View>
        </View>
        <View style={styles.saveBtn}>
          <TouchableOpacity onPress={() => updateDetails()}>
            <Text style={styles.btnsText}>שמירת פרטים</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 35,
  },
  detailsContainerView: {
    width: '85%',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 30,
    padding: 5,
    flexDirection: 'column',
    float: 'right',
  },
  detailBlock: {
    width: '100%',
    direction: 'row',
    justifyContent: 'space-around',
  },
  subTitle: {
    width: '85%',
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FD683D',
    alignSelf: 'flex-start',
  },
  detail: {
    width: '65%',
    fontSize: 18,
    marginHorizontal: 5,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editInput: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icons: {
    padding: 5,
  },
  saveBtn: {
    width: '60%',
    paddingVertical: 12,
    margin: 30,
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2,
  },
  btnsText: {
    fontWeight: 'bold',
    fontSize: 15
  },
})

export default DeliverymanProfile