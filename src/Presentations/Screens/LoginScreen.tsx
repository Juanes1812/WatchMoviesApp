import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      if (userData.privilegio === 1) {
        navigation.navigate('AdminDrawer');
      } else if (userData.privilegio === 2) {
        navigation.navigate('UserDrawer');
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
          <Button title="Iniciar Sesión" onPress={handleLogin} />
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
});

export default LoginScreen;
