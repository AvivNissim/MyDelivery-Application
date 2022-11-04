import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';


// Screens
import Login from './Screens/Login';
import Register from './Screens/Register';
import UserMain from './Screens/Users/UserMain';
import UserProfile from './Screens/Users/UserProfile';
import UserOrders from './Screens/Users/UserOrders';
import Main from './Screens/Main';
import DeliverymanMain from './Screens/Deliverymen/DeliverymanMain';
import Deliveries from './Screens/Deliverymen/Deliveries';
import ClosedDeliveries from './Screens/Deliverymen/ClosedDeliveries';
import DeliverymanProfile from './Screens/Deliverymen/DeliverymanProfile';
import UserOrderSummary from './Screens/Users/UserOrderSummary';
import UserPayment from './Screens/Users/UserPayment';
import RegisterUserForm from './Components/RegisterUserForm';
import RegisterDeliverymanForm from './Components/RegisterDeliverymanForm';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const UserTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 13 } }} >
      <Tab.Screen name="Main" component={UserMain}
        options={{
          tabBarLabel: 'ראשי',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="home" color='#FD683D' size={30} />
          ),
        }}
      />
      <Tab.Screen name="My Orders" component={UserOrders}
        options={{
          tabBarLabel: 'ההזמנות שלי',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="clipboard-list" color='#FD683D' size={30} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={UserProfile}
        options={{
          tabBarLabel: 'פרופיל',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="user-cog" color='#FD683D' size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DeliverymanTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 13 } }} >
      <Tab.Screen name="Main" component={DeliverymanMain}
        options={{
          tabBarLabel: 'ראשי',
          labelStyle: {
            fontSize: 25,
          },
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="home" color='#FD683D' size={30} />
          ),
        }}
      />
      <Tab.Screen name="Deliveries" component={Deliveries}
        options={{
          tabBarLabel: 'משלוחים',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="shipping-fast" color='#FD683D' size={30} />
          ),
        }}
      />
      <Tab.Screen name="Closed Deliveries" component={ClosedDeliveries}
        options={{
          tabBarLabel: 'בוצע',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="clipboard-check" color='#FD683D' size={30} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={DeliverymanProfile}
        options={{
          tabBarLabel: 'פרופיל',
          tabBarActiveTintColor: '#FD683D',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: () => (
            <Icon type="font-awesome-5" name="user-cog" color='#FD683D' size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UserTabs" component={UserTabs} />
          <Stack.Screen name="UserMain" component={UserMain} />
          <Stack.Screen name="DeliverymanTabs" component={DeliverymanTabs} />
          <Stack.Screen name="UserOrderSummary" component={UserOrderSummary} />
          <Stack.Screen name="UserPayment" component={UserPayment} />
          <Stack.Screen name="RegisterUserForm" component={RegisterUserForm} />
          <Stack.Screen name="RegisterDeliverymanForm" component={RegisterDeliverymanForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


