import React, { useState, useEffect } from 'react'
import { Button, FlatList, Text, TextInput, View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { PrimaryButton } from '../Componentes';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';
//rafc, 


export const CrudSeries = () => {
  const [series, setSeries] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEstreno, setFechaEstreno] = useState('');
  const [idPlataforma, setIdPlataforma] = useState('');
  const [idDirector, setIdDirector] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [serieSeleccionada, setSerieSeleccionada] = useState(null);

  //Para la navegación dentro de la página
  const navigation = useNavigation();

  // Obtener series de Supabase al montar el componente
  const fetchSeries = async () => {
    const { data, error } = await supabase.from('serie').select('*');

    if (error) {
      console.error('Error al obtener series:', error);
    } else {
      setSeries(data);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  // Agregar una nueva serie a Supabase
  const agregarSerie = async () => {
    if (titulo && descripcion && fechaEstreno && idPlataforma && idDirector) {
      const nuevaSerie = { titulo, descripcion, fechaEstreno, id_plataforma: idPlataforma, id_director: idDirector };
      const { data, error } = await supabase.from('serie').insert([nuevaSerie]);

      if (error) {
        console.error('Error al agregar serie:', error.message);
      } else {
        setSeries([...series, ...data]);
        setTitulo('');
        setDescripcion('');
        setFechaEstreno('');
        setIdPlataforma('');
        setIdDirector('');
      }
    }
  };

  // Editar serie (abre el modal de edición)
  const handleEdit = (serie) => {
    setSerieSeleccionada(serie);
    setModalVisible(true);
  };

  // Guardar cambios de serie en Supabase
  const guardarSerie = async () => {
    if (serieSeleccionada && serieSeleccionada.titulo) {
      const { error } = await supabase
        .from('serie')
        .update({
          titulo: serieSeleccionada.titulo,
          descripcion: serieSeleccionada.descripcion,
          fechaEstreno: serieSeleccionada.fechaEstreno,
          id_plataforma: serieSeleccionada.id_plataforma,
          id_director: serieSeleccionada.id_director,
        })
        .eq('id', serieSeleccionada.id);

      if (error) {
        console.error('Error al actualizar serie:', error.message);
      } else {
        fetchSeries();
        setModalVisible(false);
      }
    }
  };

  // Eliminar serie de Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('serie')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar serie:', error);
    } else {
      setSeries(series.filter((serie) => serie.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.linea}>
          <View style={styles.sectionFormato}>
            <Text style={styles.titulo}>Agregar Serie</Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={text => setTitulo(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={text => setDescripcion(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Estreno"
              value={fechaEstreno}
              onChangeText={text => setFechaEstreno(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Plataforma"
              value={idPlataforma}
              onChangeText={text => setIdPlataforma(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Director"
              value={idDirector}
              onChangeText={text => setIdDirector(text)}
            />

            <PrimaryButton
              label="Agregar"
              onPress={agregarSerie}
              onLongPress={agregarSerie}
            />
          </View>

          <View style={styles.containerTable}>
            <View style={styles.table}>
              <View style={styles.rowHeader}>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Título</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Descripción</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Fecha</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>ID Plataforma</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>ID Director</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Edit</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Delete</Text>
                </View>
              </View>

              <FlatList
                data={series}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.titulo}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>
                        {new Date(item.fechaEstreno).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.id_plataforma}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.id_director}</Text>
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

      {/* Modal para editar serie */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Serie</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={serieSeleccionada?.titulo || ''}
              onChangeText={(text) => setSerieSeleccionada({ ...serieSeleccionada, titulo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={serieSeleccionada?.descripcion || ''}
              onChangeText={(text) => setSerieSeleccionada({ ...serieSeleccionada, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Estreno"
              value={serieSeleccionada?.fechaEstreno || ''}
              onChangeText={(text) => setSerieSeleccionada({ ...serieSeleccionada, fechaEstreno: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Plataforma"
              value={serieSeleccionada?.id_plataforma || ''}
              onChangeText={(text) => setSerieSeleccionada({ ...serieSeleccionada, id_plataforma: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Director"
              value={serieSeleccionada?.id_director || ''}
              onChangeText={(text) => setSerieSeleccionada({ ...serieSeleccionada, id_director: text })}
            />
            <PrimaryButton
              label='Guardar'
              onPress={guardarSerie}
              onLongPress={guardarSerie}
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
