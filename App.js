import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Ourriders from './screens/ourriders';
import Ridersbikes from './screens/ridersbikes';
import About from './screens/about';
import Login from './screens/login';
import Admin from './screens/adminpage';
import Addridersbike from './screens/addridersbike';
import Updateordelete from './screens/updateordelete';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor:'#4E6448' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
        />
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{ title: "About Meanwood Valley's MTB" }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Log In'}}
        />
        <Stack.Screen 
          name="Admin" 
          component={Admin} 
          options={{ title: 'Add, Edit or Delete a Rider'}}
        />
        <Stack.Screen 
          name="Ourriders" 
          component={Ourriders} 
          options={{ title: 'Our Riders'}}
        />
        <Stack.Screen 
          name="Ridersbikes" 
          component={Ridersbikes} 
          options={{ title: 'Our Riders Bike'}}
        />
        <Stack.Screen 
          name="Addridersbike" 
          component={Addridersbike} 
          options={{ title: 'Add A New Rider and A Bike'}}
        />
        <Stack.Screen 
          name="Updateordelete" 
          component={Updateordelete} 
          options={{ title: 'Edit this Riders Bike'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



