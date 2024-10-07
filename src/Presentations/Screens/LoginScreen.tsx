import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet } from 'react-native';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const handleLogin = async () => {
    try {
      // Buscar usuario en la tabla 'usuarios' con el correo ingresado
      const { data: userData, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        Alert.alert('Error', 'Usuario no encontrado');
        return;
      }

      // Verificar la contraseña
      if (userData.password !== password) {
        Alert.alert('Error', 'Contraseña incorrecta');
        return;
      }

      // Redirigir según el privilegio del usuario
      if (userData.privilegio === 1) {
        navigation.navigate('AdminDrawer');
      } else if (userData.privilegio === 2) {
        navigation.navigate('UserDrawer');
      } else {
        Alert.alert('Error', 'Privilegio no reconocido');
      }
    } catch (err) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión');
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <View style={{ marginVertical: 10 }}>
            <Button title="Iniciar Sesión" onPress={handleLogin} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
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
});

export default LoginScreen;
