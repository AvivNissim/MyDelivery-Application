import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

const UserMain = ({ navigation }) => {

  const [fromCity, setFromCity] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [toCity, setToCity] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [packageTypeCode, setPackageTypeCode] = useState(0)
  const [packageTypeName, setPackageTypeName] = useState('')

  const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('currentUser')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      Alert.alert("Can't get current user")
    }
  }

  const clearData = () => {
    setFromCity('');
    setFromAddress('')
    setToCity('')
    setToAddress('')
    setPackageTypeName('')
  }

  const acceptAndPayBtn = async () => {
    if (fromCity != '' && fromAddress != '' && toCity != '' && toAddress != '' && packageTypeCode != 0) {
      try {
        let currentUser = await getData();
        let info = {
          Delivery_Date: date,
          From_City: fromCity,
          To_City: toCity,
          From_Address: fromAddress,
          To_Address: toAddress,
          Package_Type_Code: packageTypeCode,
          Package_Type_Name: packageTypeName,
          Delivery_Comment: '',
          User_Id: currentUser.Id,
          Is_Finished: 0
        }
        let userOrder = info
        if (userOrder != null) {
          clearData();
          navigation.navigate('UserOrderSummary', { userOrder: userOrder });
        }
      } catch (e) {
        // saving error
        Alert.alert(`Can't save the order`)
      }
    }
    else
      Alert.alert('??????????', '???? ?????????? ???????????? ?????????? ??????????.\n ?????? ?????? ???? ???? ??????????.')
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}> ?????????? ?????????? </Text>
        </View>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 17 }}> ?????? ???????? ???????? ?????????? ?????????? ?????????? ???????? ?????????? </Text>
        </View>

        <View style={styles.inputsView}>
          <Input
            label="?????? ????????:"
            placeholder='???????? ?????? ???????? ????????????'
            leftIcon={
              <Icon
                type='MaterialIcons'
                name='location-city'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setFromCity(txt)}
            value={fromCity}
          />

          <Input
            label="?????????? ????????:"
            placeholder='???????? ?????????? ???????? ????????????'
            leftIcon={
              <Icon
                type="MaterialIcons"
                name='delivery-dining'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setFromAddress(txt)}
            value={fromAddress}
          />

          <Input
            label="?????? ??????:"
            placeholder='???????? ?????? ?????? ????????????'
            leftIcon={
              <Icon
                type='MaterialIcons'
                name='location-city'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setToCity(txt)}
            value={toCity}
          />

          <Input
            label="?????????? ??????:"
            placeholder='???????? ?????????? ?????? ????????????'
            leftIcon={
              <Icon
                type="MaterialIcons"
                name='delivery-dining'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setToAddress(txt)}
            value={toAddress}
          />
        </View>

        <View style={styles.dropdownMenu}>
          <SelectDropdown
            data={[
              { label: "???????? - ???? 1 ????????", value: 1 },
              { label: "?????????????? - ???? 5 ????????", value: 2 },
              { label: "?????????? - ???? 10 ????????", value: 3 },
            ]}
            defaultButtonText="?????? ?????? ??????????"
            defaultValue={packageTypeName}
            value={packageTypeName}
            onSelect={(selectedItem, index) => {
              setPackageTypeCode(selectedItem.value)
              setPackageTypeName(selectedItem.label)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.label
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.label
            }}
          />
        </View>
        <View style={styles.continueAndPayBtn}>
          <TouchableOpacity onPress={acceptAndPayBtn}>
            <Text style={styles.btnsText}>?????????? ????????????</Text>
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
  inputsView: {
    marginTop: 25,
    width: '85%',
    padding: 10,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  dropdownMenu: {
    alignItems: 'center',
    textAlign: 'center',
    width: '60%',
    marginTop: 30,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
  },
  continueAndPayBtn: {
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

export default UserMain