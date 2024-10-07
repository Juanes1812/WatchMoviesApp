import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { PrimaryButton } from '../Componentes';
import { supabase } from '../services/supabaseClient';

export const CrudSerie_idioma = () => {
  const [series, setSeries] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [idSerie, setIdSerie] = useState('');
  const [idIdioma, setIdIdioma] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [conexionSeleccionada, setConexionSeleccionada] = useState(null);
  const [conexiones, setConexiones] = useState([]);

  // Obtener series de Supabase
  const fetchSeries = async () => {
    const { data, error } = await supabase.from('serie').select('id, titulo');

    if (error) {
      console.error('Error al obtener series:', error);
    } else {
      setSeries(data);
    }
  };

  // Obtener idiomas de Supabase
  const fetchIdiomas = async () => {
    const { data, error } = await supabase.from('idioma').select('id, nombre');

    if (error) {
      console.error('Error al obtener idiomas:', error);
    } else {
      setIdiomas(data);
    }
  };

  // Obtener conexiones de Supabase
  const fetchConexiones = async () => {
    const { data, error } = await supabase.from('serie_idioma').select('*');

    if (error) {
      console.error('Error al obtener conexiones:', error);
    } else {
      setConexiones(data);
    }
  };

  useEffect(() => {
    fetchSeries();
    fetchIdiomas();
    fetchConexiones();
  }, []);

  // Agregar una nueva conexión
  const agregarConexion = async () => {
    if (idSerie && idIdioma) {
      const nuevaConexion = { id_serie: idSerie, id_idioma: idIdioma };
      const { data, error } = await supabase.from('serie_idioma').insert([nuevaConexion]);

      if (error) {
        console.error('Error al agregar conexión:', error.message);
      } else {
        setConexiones([...conexiones, ...data]);
        setIdSerie('');
        setIdIdioma('');
      }
    }
  };

  // Editar conexión (abre el modal de edición)
  const handleEdit = (conexion) => {
    setConexionSeleccionada(conexion);
    setModalVisible(true);
  };

  // Guardar cambios de conexión en Supabase
  const guardarConexion = async () => {
    if (conexionSeleccionada) {
      const { error } = await supabase
        .from('serie_idioma')
        .update({
          id_serie: conexionSeleccionada.id_serie,
          id_idioma: conexionSeleccionada.id_idioma,
        })
        .eq('id', conexionSeleccionada.id);

      if (error) {
        console.error('Error al actualizar conexión:', error.message);
      } else {
        fetchConexiones();
        setModalVisible(false);
      }
    }
  };

  // Eliminar conexión de Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('serie_idioma')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar conexión:', error);
    } else {
      setConexiones(conexiones.filter((conexion) => conexion.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Tabla de Series */}
        <View style={styles.sectionFormato}>
          <Text style={styles.titulo}>Series</Text>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>ID</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Título</Text>
              </View>
            </View>
            <FlatList
              data={series}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.id}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.titulo}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        {/* Tabla de Idiomas */}
        <View style={styles.sectionFormato}>
          <Text style={styles.titulo}>Idiomas</Text>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>ID</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Nombre</Text>
              </View>
            </View>
            <FlatList
              data={idiomas}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.id}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.nombre}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        {/* Formulario para conexiones */}
        <View style={styles.sectionFormato}>
          <Text style={styles.titulo}>Agregar Conexión Serie_Idioma</Text>
          <TextInput
            style={styles.input}
            placeholder="ID Serie"
            value={idSerie}
            onChangeText={text => setIdSerie(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID Idioma"
            value={idIdioma}
            onChangeText={text => setIdIdioma(text)}
          />
          <PrimaryButton
            label="Agregar Conexión"
            onPress={agregarConexion}
            onLongPress={agregarConexion}
          />
        </View>

        {/* Tabla de Conexiones */}
        <View style={styles.sectionFormato}>
          <Text style={styles.titulo}>Serie_idioma</Text>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>ID Serie</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>ID Idioma</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Edit</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Delete</Text>
              </View>
            </View>
            <FlatList
              data={conexiones}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.id_serie}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.id_idioma}</Text>
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
      </ScrollView>

      {/* Modal para editar conexión */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Conexión</Text>
            <TextInput
              style={styles.input}
              placeholder="ID Serie"
              value={conexionSeleccionada?.id_serie.toString() || ''}
              onChangeText={(text) => setConexionSeleccionada({ ...conexionSeleccionada, id_serie: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Idioma"
              value={conexionSeleccionada?.id_idioma.toString() || ''}
              onChangeText={(text) => setConexionSeleccionada({ ...conexionSeleccionada, id_idioma: text })}
            />
            <PrimaryButton
              label='Guardar'
              onPress={guardarConexion}
              onLongPress={guardarConexion}
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
