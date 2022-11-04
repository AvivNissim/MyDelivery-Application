import { View, Text, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Get } from '../../API/Fetch';


const ClosedDeliveries = () => {

  const [currentDeliveryman, setCurrentDeliveryman] = useState([])
  const [myDeliveries, setMyDeliveries] = useState([])


  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('currentUser')
    const currentUser = jsonValue != null ? JSON.parse(jsonValue) : null;
    setCurrentDeliveryman(currentUser)

    let allDeliveries = await Get(`api/DeliverymanInDelivery/Open`)
    if (allDeliveries && allDeliveries.length > 0 && allDeliveries != null) {
      setMyDeliveries(allDeliveries)
    } else {
      setMyDeliveries({})
    }
  }

  useFocusEffect(useCallback(() => {
    getData();
  }, []));


  const cancelDeliveryBtn = () => {
    alert("Cancel Delivery Btn")
  }


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
          <TouchableOpacity style={styles.cancelDeliveryBtn}
            onPress={cancelDeliveryBtn}
          >
            <Text style={styles.btnsText}> ביטול משלוח </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const RenderText = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50, color: '#000' }}> אין משלוחים פעילים </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> משלוחים שבוצעו </Text>
      </View>

      <View style={styles.ordersListView}>
        <FlatList
          data={myDeliveries}
          renderItem={RenderItem}
          key={myDeliveries.Delivery_Id}
          keyExtractor={(item) => item.Delivery_Id}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '80%',
    marginTop: 10,
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
    flex: 1,
    flexGrow: 1,
  },
  allMyOrdersBtn: {
    width: '28%',
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#FD683D',
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
  cancelDeliveryBtn: {
    width: '30%',
    backgroundColor: '#FD683D',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 2,
  },
  btnsText: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
  },
})

export default ClosedDeliveries