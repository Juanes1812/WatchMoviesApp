import React, { useState, useEffect } from 'react'
import { Button, FlatList, Text, TextInput, View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { PrimaryButton } from '../Componentes';
import { supabase } from '../services/supabaseClient';
//rafc, 

export const CrudPlataforma = () => {
  const [plataformas, setPlataformas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null); // Para la plataforma que vamos a editar

  // Obtener plataformas de Supabase 
  const fetchPlataformas = async () => {
    const { data, error } = await supabase.from('plataforma').select('*');
    if (error) {
      console.error('Error al obtener plataformas:', error);
    } else {
      console.log('Plataformas obtenidas:', data);
      setPlataformas(data);
    }
  };

  useEffect(() => {
    fetchPlataformas();
  }, []);

  // Agregar una nueva plataforma
  const agregarPlataforma = async () => {
    if (nombre) {
      const nuevaPlataforma = { nombre };
      const { data, error } = await supabase.from('plataforma').insert([nuevaPlataforma]);
      if (error) {
        console.error('Error al agregar plataforma:', error.message);
      } else if (data == null) {
        console.error('No se pudo insertar la plataforma, data es null');
      } else {
        setNombre('');
        setPlataformas([...plataformas, ...data]);
      }
    }
  };

  const handleEdit = (plataforma) => {
    setPlataformaSeleccionada(plataforma);  // Guardamos la plataforma seleccionada
    setModalVisible(true);  
  };

  // Guardar cambios en la plataforma
  const guardarPlataforma = async () => {
    if (plataformaSeleccionada && plataformaSeleccionada.nombre) {
      const { error } = await supabase
        .from('plataforma')
        .update({ nombre: plataformaSeleccionada.nombre })
        .eq('id', plataformaSeleccionada.id);
      if (error) {
        console.error('Error al actualizar plataforma:', error.message);
      } else {
        // Actualiza la lista 
        fetchPlataformas();
        setModalVisible(false);  
      }
    }
  };

  // Eliminar plataforma
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('plataforma')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar plataforma:', error);
    } else {
      setPlataformas(plataformas.filter((plataforma) => plataforma.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.linea}>
          <View style={styles.sectionFormato}>
            <Text style={styles.titulo}>Agregar Plataforma</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={text => setNombre(text)}
            />
            <PrimaryButton
              label='Agregar'
              onPress={agregarPlataforma}
              onLongPress={agregarPlataforma}
            />
          </View>

          <View style={styles.containerTable}>
            <View style={styles.table}>
              <View style={styles.rowHeader}>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Nombre</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Edit</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Delete</Text>
                </View>
              </View>

              <FlatList
                data={plataformas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.nombre}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.cell, styles.editButton]}
                      onPress={() => handleEdit(item)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.cell, styles.deleteButton]}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}  // Cierra el modal cuando se presiona fuera
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.titulo}>Editar Plataforma</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={plataformaSeleccionada?.nombre || ''}
                onChangeText={(text) => setPlataformaSeleccionada({ ...plataformaSeleccionada, nombre: text })}
              />
              <PrimaryButton
                label='Guardar'
                onPress={guardarPlataforma}
                onLongPress={guardarPlataforma}
              />
              <PrimaryButton
                label='Cancelar'
                onPress={() => setModalVisible(false)}
                onLongPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#354f5f',
  },
  sectionFormato: {
    marginVertical: 20,
    alignItems: 'center',
  },
  titulo: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linea: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 25,
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
  cellText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTable: {
    alignSelf: 'center',
    width: '95%',
  },
  table: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4a4a4a',
  },
  cell: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#3a3a3a',
    fontSize: 14,
    color: '#fff',
    overflow: 'hidden', // Oculta el texto que se desborde
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: '#3a3a3a',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: 300,
    backgroundColor: '#354f5f',
    padding: 20,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 60,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',

  },

});
