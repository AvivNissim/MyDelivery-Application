import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const UserOrderSummary = ({ navigation, route }) => {

  const { userOrder } = route.params
  const [fromCity, setFromCity] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [toCity, setToCity] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [packageType, setPackageType] = useState('')
  const [price, setPrice] = useState(0)

  const getData = () => {
    try {

      if (userOrder != null) {
        setFromCity(userOrder.From_City);
        setFromAddress(userOrder.From_Address);
        setToCity(userOrder.To_City);
        setToAddress(userOrder.To_Address);
        setPackageType(userOrder.Package_Type_Name);
        setPrice(userOrder.Price);
      }
    } catch (e) {
      // error reading value
      Alert.alert("Can't get order data")
    }
  }


  useFocusEffect(useCallback(() => {
    getData();
  }, []));

  const toPayBtn = () => {
    navigation.navigate('UserPayment', { userOrder: userOrder })
  }

  const toBackBtn = async () => {
    await AsyncStorage.removeItem('userOrder', () => {
      navigation.navigate('UserMain')
    });
  }

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}> סיכום משלוח </Text>
      </View>

      <View style={styles.detailsContainerView}>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> עיר מוצא: </Text>
          <Text style={styles.detail}> {fromCity}
          </Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> כתובת מוצא: </Text>
          <Text style={styles.detail}> {fromAddress}
          </Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> עיר יעד: </Text>
          <Text style={styles.detail}> {toCity}
          </Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> כתובת יעד: </Text>
          <Text style={styles.detail}> {toAddress}
          </Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> סוג החבילה: </Text>
          <Text style={styles.detail}> {packageType}
          </Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.subTitle}> מחיר: </Text>
          <Text style={styles.detail}> {price}
          </Text>
        </View>
      </View>
      <View style={styles.BtnsView}>
        <TouchableOpacity style={styles.createAccountBtn} onPress={toPayBtn} >
          <Text style={styles.btnsText}>מעבר לתשלום</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signinBtn} onPress={toBackBtn} >
          <Text style={styles.btnsText}>חזרה למסך ההזמנה</Text>
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
    marginTop: 20,
    backgroundColor: '#E9E9E9'
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 35,
  },
  detailsContainerView: {
    width: '80%',
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 30,
    padding: 5,
  },
  detailBlock: {
    padding: 7,
  },
  subTitle: {
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    color: '#FD683D'
  },
  detail: {
    fontSize: 18,
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
  BtnsView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
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
  },

})

export default UserOrderSummary