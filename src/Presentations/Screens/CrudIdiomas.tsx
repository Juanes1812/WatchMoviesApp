import React, { useState, useEffect } from 'react'
import { Button, FlatList, Text, TextInput, View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { PrimaryButton } from '../Componentes';
import { supabase } from '../services/supabaseClient';
//rafc, 

export const CrudIdiomas = () => {
  const [idiomas, setIdiomas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);

  // Obtener idiomas de Supabase al montar el componente
  const fetchIdiomas = async () => {
    const { data, error } = await supabase.from('idioma').select('*');

    if (error) {
      console.error('Error al obtener idiomas:', error);
    } else {
      setIdiomas(data);
    }
  };

  useEffect(() => {
    fetchIdiomas();
  }, []);

  // Agregar un nuevo idioma a Supabase
  const agregarIdioma = async () => {
    if (nombre && isoCode) {
      const nuevoIdioma = { nombre, isoCode };
      const { data, error } = await supabase.from('idioma').insert([nuevoIdioma]);

      if (error) {
        console.error('Error al agregar idioma:', error.message);
      } else {
        setIdiomas([...idiomas, ...data]);
        setNombre('');
        setIsoCode('');
      }
    }
  };

  // Editar idioma (abre el modal de edición)
  const handleEdit = (idioma) => {
    setIdiomaSeleccionado(idioma);
    setModalVisible(true);
  };

  // Guardar cambios de idioma en Supabase
  const guardarIdioma = async () => {
    if (idiomaSeleccionado && idiomaSeleccionado.nombre) {
      const { error } = await supabase
        .from('idioma')
        .update({
          nombre: idiomaSeleccionado.nombre,
          isoCode: idiomaSeleccionado.isoCode,
        })
        .eq('id', idiomaSeleccionado.id);

      if (error) {
        console.error('Error al actualizar idioma:', error.message);
      } else {
        fetchIdiomas();
        setModalVisible(false);
      }
    }
  };

  // Eliminar idioma de Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('idioma')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar idioma:', error);
    } else {
      setIdiomas(idiomas.filter((idioma) => idioma.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.linea}>
          <View style={styles.sectionFormato}>
            <Text style={styles.titulo}>Agregar Idioma</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={text => setNombre(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ISO Code"
              value={isoCode}
              onChangeText={text => setIsoCode(text)}
            />

            <PrimaryButton
              label="Agregar"
              onPress={agregarIdioma}
              onLongPress={agregarIdioma}
            />
          </View>

          <View style={styles.containerTable}>
            <View style={styles.table}>
              <View style={styles.rowHeader}>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Nombre</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>ISO Code</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Edit</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Delete</Text>
                </View>
              </View>

              <FlatList
                data={idiomas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.nombre}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.isoCode}</Text>
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
      </ScrollView>

      {/* Modal para editar idioma */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Idioma</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={idiomaSeleccionado?.nombre || ''}
              onChangeText={(text) => setIdiomaSeleccionado({ ...idiomaSeleccionado, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="ISO Code"
              value={idiomaSeleccionado?.isoCode || ''}
              onChangeText={(text) => setIdiomaSeleccionado({ ...idiomaSeleccionado, isoCode: text })}
            />
            <PrimaryButton
              label='Guardar'
              onPress={guardarIdioma}
              onLongPress={guardarIdioma}
            />
            <PrimaryButton
              label='Cancelar'
              onPress={() => setModalVisible(false)}
              onLongPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
