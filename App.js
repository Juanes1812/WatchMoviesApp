import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Holamundo } from './src/Presentations/Screens/Holamundo';
import { Contador } from './src/Presentations/Screens/Contador';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { WatchMovies } from './src/Presentations/Screens/WatchMovies';
import { CrudActores } from './src/Presentations/Screens/CrudActores';
import { CrudPlataforma } from './src/Presentations/Screens/CrudPlataforma';
import { CrudIdiomas } from './src/Presentations/Screens/CrudIdiomas';
import { CrudSeries } from './src/Presentations/Screens/CrudSeries';
import { CrudDirectores } from './src/Presentations/Screens/CrudDirectores';
import { CrudSerie_actor } from './src/Presentations/Screens/CrudSerie_actor';
import { CrudSerie_idioma } from './src/Presentations/Screens/CrudSerie_Idioma';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="WatchMovies">
        <Drawer.Screen name="WatchMovies" component={WatchMovies} />
        <Drawer.Screen name="CrudActores" component={CrudActores} />
        <Drawer.Screen name="CrudDirectores" component={CrudDirectores} />
        <Drawer.Screen name="CrudPlataforma" component={CrudPlataforma} />
        <Drawer.Screen name="CrudIdiomas" component={CrudIdiomas} />
        <Drawer.Screen name="CrudSeries" component={CrudSeries} />
        <Drawer.Screen name="CrudSerie_Actor" component={CrudSerie_actor} />
        <Drawer.Screen name="CrudSerie_Idioma" component={CrudSerie_idioma} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Color lila
  },
  titulo: {
    fontSize: 12,
    color: "FFFFFF",
  },
});
