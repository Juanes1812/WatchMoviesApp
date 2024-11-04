import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/Presentations/Screens/LoginScreen';
import { WatchMovies } from './src/Presentations/Screens/WatchMovies';
import { CrudActores } from './src/Presentations/Screens/CrudActores';
import { CrudPlataforma } from './src/Presentations/Screens/CrudPlataforma';
import { CrudIdiomas } from './src/Presentations/Screens/CrudIdiomas';
import { CrudSeries } from './src/Presentations/Screens/CrudSeries';
import { CrudDirectores } from './src/Presentations/Screens/CrudDirectores';
import { CrudSerie_actor } from './src/Presentations/Screens/CrudSerie_actor';
import { CrudSerie_idioma } from './src/Presentations/Screens/CrudSerie_Idioma';
import FoodImage from './src/Presentations/Screens/FoodImage';
import RegisterScreen from './src/Presentations/Screens/RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Admin Drawer Navigator
function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="WatchMovies">
      <Drawer.Screen name="Inicio" component={WatchMovies} />
      <Drawer.Screen name="¿Qué Comer?" component={FoodImage} />
      <Drawer.Screen name="CrudActores" component={CrudActores} />
      <Drawer.Screen name="CrudDirectores" component={CrudDirectores} />
      <Drawer.Screen name="CrudPlataforma" component={CrudPlataforma} />
      <Drawer.Screen name="CrudIdiomas" component={CrudIdiomas} />
      <Drawer.Screen name="CrudSeries" component={CrudSeries} />
      <Drawer.Screen name="CrudSerie_Actor" component={CrudSerie_actor} />
      <Drawer.Screen name="CrudSerie_Idioma" component={CrudSerie_idioma} />
    </Drawer.Navigator>
  );
}

// User Drawer Navigator (Solo acceso a vistas)
function UserDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="WatchMovies">
      <Drawer.Screen name="Inicio" component={WatchMovies} />
      <Stack.Screen name="¿Qué Comer?" component={FoodImage} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Registro de Usuarios" component={RegisterScreen} />
        <Stack.Screen
          name="AdminDrawer"
          component={AdminDrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDrawer"
          component={UserDrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
