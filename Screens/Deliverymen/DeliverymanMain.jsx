import { View, Text, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Get } from '../../API/Fetch'
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'YOUR API KEY GOES HERE'

const DeliverymanMain = () => {

  const [currentDeliveryman, setCurrentDeliveryman] = useState([])
  const [openDeliveries, setOpenDeliveries] = useState([])
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('currentUser')
    const currentUser = jsonValue != null ? JSON.parse(jsonValue) : null;
    setCurrentDeliveryman(currentUser)
    let openOrders = await Get(`api/DeliverymanInDelivery/Open/${currentUser.Id_Num}`);
    setOpenDeliveries(openOrders);

    Geocoder.from(`${openOrders[0].From_Address} ${openOrders[0].From_City}`)
      .then(json => {
        var location = json.results[0].geometry.location;
        setFrom(location)
      })
      .catch(error => console.warn(error));

    Geocoder.from(`${openOrders[0].To_Address} ${openOrders[0].To_City}`)
      .then(json => {
        var location = json.results[0].geometry.location;
        setTo(location)
      })
      .catch(error => console.warn(error));

  }

  useFocusEffect(useCallback(() => {
    getData();
  }, []));


  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}> שלום, {currentDeliveryman.First_Name} </Text>
      </View>
      <View style={styles.subtitleView}>
        <Text style={styles.subtitle}> ההכנסות שלך </Text>
        <Text style={styles.detail}> 3,280.20 ₪ </Text>
      </View>
      <View style={styles.subtitleView}>
        <Text style={styles.subtitle}> משלוח פעיל </Text>
        <View style={styles.deliveryDetails}>
          {
            openDeliveries.length == 0 ?
              <Text style={{ fontSize: 20, textAlign: 'center', padding: 50, fontWeight: 'bold' }}>אין משלוח פעיל</Text>
              :
              <View style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomColor: '#000',
                borderBottomWidth: 1.5,
                padding: 5
              }}>
                <Text style={styles.dateInList}> {openDeliveries[0].Delivery_Date} </Text>
                <Text style={styles.deliveryInList}> {openDeliveries[0].From_Address}, {openDeliveries[0].From_City} {"--->"} {openDeliveries[0].To_Address}, {openDeliveries[0].To_City} </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> סוג משלוח: {openDeliveries[0].Package_Type_Name} </Text>
              </View>
          }


          {to && from &&
            <MapView style={styles.map} region={{ latitude: from.latitude, longitude: from.longitude, latitudeDelta: 0.0008, longitudeDelta: 0.0011 }} showsUserLocation={true}>
              <Marker coordinate={from}/>
              <MapViewDirections
                origin={from}
                destination={to}
                apikey={GOOGLE_MAPS_APIKEY}
              />
            </MapView>}
        </View>
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
  map: {
    width: '100%',
    height: 400
  },
  title: {
    paddingTop: 30,
    padding: 15,
    fontWeight: 'bold',
    fontSize: 25,
  },
  subtitleView: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  subtitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 15,
  },
  detail: {
    fontSize: 50,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: '#FD683D',
  },
  deliveryDetails: {
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 500,
    flexGrow: 1,
  },
  dateInList: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 15
  },
  deliveryInList: {
    fontWeight: 'bold',
    fontSize: 15,
  },

})

export default DeliverymanMain