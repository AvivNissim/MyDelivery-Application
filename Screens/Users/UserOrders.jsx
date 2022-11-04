import { View, Text, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import React, { useState, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Get } from '../../API/Fetch';


const UserOrders = () => {

  const [openOrdersBtn, setOpenOrdersBtn] = useState(false)
  const [closedOrdersBtn, setClosedOrderBtn] = useState(false)

  const [openOrdersList, setOpenOrdersList] = useState([]);
  const [closedOrdersList, setClosedOrdersList] = useState([]);

  const showOpenOrders = () => {
    setOpenOrdersBtn(true)
    setClosedOrderBtn(false)
  }

  const showClosedOrders = () => {
    setClosedOrderBtn(true)
    setOpenOrdersBtn(false)
  }

  const getCurrentUser = async () => {
    const jsonValue = await AsyncStorage.getItem('currentUser')
    const currentUser = jsonValue != null ? JSON.parse(jsonValue) : null;
    return currentUser
  }


  const getOpenOrders = async () => {
    let currentUser = await getCurrentUser();
    let orders = await Get(`api/deliveries/active/user/${currentUser.Id}`)
    if (orders && orders.length > 0 && orders != null) {
      setOpenOrdersList(orders);
    }
    showOpenOrders();
  }

  const getClosedOrders = async () => {
    let currentUser = await getCurrentUser();
    let orders = await Get(`api/deliveries/close/user/${currentUser.Id}`)
    if (orders && orders.length > 0 && orders != null) {
      setClosedOrdersList(orders);
    }
    showClosedOrders();
  }

  useFocusEffect(useCallback(() => {
    getOpenOrders();
  }, []));

  const RenderItem = ({ item }) => {
    return (
      <View style={{
        width: '100%',
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 6,
        padding: 8,
      }}>
        <Text style={{ alignSelf: 'flex-end', fontWeight: 'bold', fontSize: 15 }}> {item.Delivery_Date} </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}> {item.From_Address}, {item.From_City} {"--->"} {item.To_Address}, {item.To_City} </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}> סוג חבילה: {item.Package_Type_Name} </Text>
        <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}> מחיר: {item.Price} ₪ </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> ההזמנות שלי </Text>
      </View>
      <View style={styles.orderFilterBtnsView}>
        <TouchableOpacity style={openOrdersBtn ? styles.btnPress : styles.allMyOrdersBtn}
          onPress={getOpenOrders}>
          <Text style={styles.btnsText}>הזמנות פתוחות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={closedOrdersBtn ? styles.btnPress : styles.allMyOrdersBtn}
          onPress={getClosedOrders} >
          <Text style={styles.btnsText}>הזמנות סגורות</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ordersListView}>

        {
          openOrdersBtn && <FlatList
            data={openOrdersList}
            renderItem={RenderItem}
            keyExtractor={(item) => item.Delivery_Id}
          />
        }
        {
          closedOrdersBtn && <FlatList
            data={closedOrdersList}
            renderItem={RenderItem}
            keyExtractor={(item) => item.Delivery_Id}
          />
        }
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
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 35,
  },
  orderFilterBtnsView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    borderTopColor: '#000',
    borderTopWidth: 1.5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnsText: {
    fontSize: 13.5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  ordersListView: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexGrow: 1
  },
  allMyOrdersBtn: {
    width: '28%',
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#C3C3C3',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  allMyOpenOrdersBtn: {
    width: '28%',
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#C3C3C3',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  allMyClosedOrdersBtn: {
    width: '28%',
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#C3C3C3',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  btnPress: {
    width: '28%',
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
})

export default UserOrders