import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../../API/Fetch';


const UserPayment = ({ navigation, route }) => {

  const { userOrder } = route.params;
  const [id, setId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [month, setMonth] = useState('00')
  const [year, setYear] = useState('00')
  const [CVV, SetCVV] = useState('')


  const makePaymentBtn = async () => {
    try {
      let info = {
        User_Id: userOrder.User_Id,
        Delivery_Date: userOrder.Delivery_Date,
        From_City: userOrder.From_City,
        From_Address: userOrder.From_Address,
        To_City: userOrder.To_City,
        To_Address: userOrder.To_Address,
        Package_Type_Code: userOrder.Package_Type_Code,
        Package_Type_Name: userOrder.Package_Type_Name,
        Delivery_Comment: userOrder.Delivery_Comment,
        Price: userOrder.Price
      }

      let userOrderRes = await Post('api/deliveries/add', info)
      if (userOrderRes && userOrderRes.length > 0) {
        Alert.alert("התשלום בוצע בהצלחה")
        await navigation.navigate("My Orders")
      }
    }
    catch (e) {
      Alert.alert(`Can't save the order`)
    }
  }

  const toBackBtn = async () => {
    await AsyncStorage.removeItem('userOrder', () => {
      navigation.navigate('UserMain')
    });

  }


  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}> פרטי תשלום </Text>
      </View>

      <View style={styles.inputsView}>
        <View>
          <Input
            keyboardType='number-pad'
            placeholder='מספר תעודת זהות'
            leftIcon={
              <Icon
                name='badge'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setId(txt)}
            value={id}
          />
          <Input
            keyboardType='number-pad'
            placeholder='מספר כרטיס אשראי'
            leftIcon={
              <Icon
                name='credit-card'
                size={25}
                color='#FD683D'
              />
            }
            onChangeText={txt => setCardNumber(txt)}
            value={cardNumber}
          />
        </View>
        <View style={styles.secondInputsView}>
          <Input style={{ textAlign: 'center' }}
            keyboardType='number-pad'
            placeholder='שנה'
            onChangeText={txt => setYear(txt)}
            value={year}
          />
          <Text style={{ fontSize: 30 }}>/</Text>
          <Input style={{ textAlign: 'center' }}
            keyboardType='number-pad'
            placeholder='חודש'
            onChangeText={txt => setMonth(txt)}
            value={month}
          />

          <Input style={{ textAlign: 'center' }}
            keyboardType='number-pad'
            placeholder='CVV'
            onChangeText={txt => setCVV(txt)}
            value={CVV}
          />
        </View>
      </View>
      <View style={styles.BtnsView}>
        <TouchableOpacity style={styles.payBtn} onPress={makePaymentBtn} >
          <Text style={styles.btnsText}>בצע תשלום</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnBackBtn} onPress={toBackBtn}>
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
  inputsView: {
    marginTop: 30,
    width: '85%',
    padding: 20,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  BtnsView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
  },
  payBtn: {
    width: '90%',
    paddingVertical: 12,
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 30,
  },
  returnBackBtn: {
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
  secondInputsView: {
    flexDirection: 'row',
    width: '31%',
    textAlign: 'center',
  },
  dropdownMenu: {
    alignItems: 'center',
    textAlign: 'center',
    width: '20%',
    marginTop: 30,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
  },
})

export default UserPayment