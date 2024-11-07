import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = async () => {
    try {
      // Buscar usuario en la tabla 'usuarios' con el correo ingresado
      const { data: userData, error } = await supabase
        .from('usuario') // Cambié de 'usuario' a 'usuarios' para que coincida con tu tabla
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        setErrorMessage('Usuario no encontrado');

        // Mostrar el mensaje solo durante 4 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);

        return;
      }

      // Verificar la contraseña
      if (userData.password !== password) {
        setErrorMessage('Contraseña incorrecta');

        // Mostrar el mensaje solo durante 4 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);

        return;
      }

      // Limpiar el mensaje de error si la contraseña es correcta
      setErrorMessage('');

      // Redirigir según el privilegio del usuario
      let codigoUsuario = userData.id; //Código pasa saber en cual Usuario Nos vamos a ubicar
      if (userData.privilegio === 1) {
        console.log('Este es el codigo Usuario'+codigoUsuario);
        navigation.navigate('AdminDrawer', {codigoUsuario});
      } else if (userData.privilegio === 2) {
        navigation.navigate('UserDrawer', { codigoUsuario});
      } else {
        setErrorMessage('Privilegio no reconocido');
      }
    } catch (err) {
      setErrorMessage('Hubo un problema al iniciar sesión');

      // Mostrar el mensaje solo durante 4 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 3500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Inicio de Sesión</Text>
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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={{ marginVertical: 10 }}>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro de Usuarios')}>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 10,
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
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default LoginScreen;
