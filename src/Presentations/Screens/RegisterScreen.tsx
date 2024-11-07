import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const privilegio = 2;


  const agregaUsuario = async () => {
    if (nombre && email && password && fechaNacimiento&&privilegio) {
      const nuevoUsuario= { nombre, email, password, fechaNacimiento, privilegio };
      const { data, error } = await supabase.from('usuario').insert([nuevoUsuario]);

      if (error) {
        console.error('Error al agregar Usuario:', error.message);
      } else {
        setNombre('');
        setEmail('');
        setPassword('');
        setFechaNacimiento('');
        }
    }
    navigation.navigate('Login');
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha Nacimiento"
          value={fechaNacimiento}
          onChangeText={(text) => setFechaNacimiento(text)}
        />

        <View style={{ marginVertical: 5 }}>
        <TouchableOpacity style={styles.button} onPress={agregaUsuario}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: 300,
    backgroundColor: '#354f5f',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo azul
    padding: 15, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Centra el texto dentro del botón
    marginVertical: 5, // Espacio vertical entre botones
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto en blanco
    fontSize: 16, // Tamaño de fuente
    fontWeight: 'bold', // Fuente en negrita
  },
});

export default RegisterScreen;
