import React, { useState, useEffect } from 'react'
import { Button, FlatList, Text, TextInput, View, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { PrimaryButton } from '../Componentes';
import { supabase } from '../services/supabaseClient';
//rafc, 

export const CrudActores = () => {

  const [actores, setActores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [actorSeleccionado, setActorSeleccionado] = useState(null);

  // Obtener actores de Supabase 

  const fetchActores = async () => {
    const { data, error } = await supabase.from('actor').select('*');

    if (error) {
      console.error('Error al obtener actores:', error);
    } else {
      setActores(data);
    }
  };
  useEffect(() => {
    fetchActores();
  }, []);

  // Agregar un nuevo actor a Supabase
  const agregarActor = async () => {
    if (nombre && apellido && nacionalidad && fecha) {
      const nuevoActor = { nombre, apellido, nacionalidad, fechaNacimiento: fecha };
      const { data, error } = await supabase.from('actor').insert([nuevoActor]);

      if (error) {
        console.error('Error al agregar actor:', error.message);
      } else {
        setActores([...actores, ...data]);
        setNombre('');
        setApellido('');
        setNacionalidad('');
        setFecha('');
        fetchActores();

      }
    }
  };

  // Editar actor (abre el modal de edición)
  const handleEdit = (actor) => {
    setActorSeleccionado(actor);
    setModalVisible(true);
  };

  // Guardar cambios de actor en Supabase
  const guardarActor = async () => {
    if (actorSeleccionado && actorSeleccionado.nombre) {
      const { error } = await supabase
        .from('actor')
        .update({
          nombre: actorSeleccionado.nombre,
          apellido: actorSeleccionado.apellido,
          nacionalidad: actorSeleccionado.nacionalidad,
          fechaNacimiento: actorSeleccionado.fechaNacimiento,
        })
        .eq('id', actorSeleccionado.id);

      if (error) {
        console.error('Error al actualizar actor:', error.message);
      } else {
        fetchActores();
        setModalVisible(false);
      }
    }
  };

  // Eliminar actor de Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('actor')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar actor:', error);
    } else {
      setActores(actores.filter((actor) => actor.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.linea}>
          <View style={styles.sectionFormato}>
            <Text style={styles.titulo}>Agregar Actor</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={text => setNombre(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={text => setApellido(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Nacionalidad"
              value={nacionalidad}
              onChangeText={text => setNacionalidad(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha"
              value={fecha}
              onChangeText={text => setFecha(text)}
            />

            <PrimaryButton
              label="Agregar"
              onPress={agregarActor}
              onLongPress={agregarActor}
            />
          </View>

          <View style={styles.containerTable}>
            <View style={styles.table}>
              <View style={styles.rowHeader}>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Nombre</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Ape.</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Nac.</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Fecha</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Edit</Text>
                </View>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>Delete</Text>
                </View>
              </View>

              <FlatList
                data={actores}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.nombre}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.apellido}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{item.nacionalidad}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>
                        {new Date(item.fechaNacimiento).toLocaleDateString()}</Text>
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Actor</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={actorSeleccionado?.nombre || ''}
              onChangeText={(text) => setActorSeleccionado({ ...actorSeleccionado, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={actorSeleccionado?.apellido || ''}
              onChangeText={(text) => setActorSeleccionado({ ...actorSeleccionado, apellido: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nacionalidad"
              value={actorSeleccionado?.nacionalidad || ''}
              onChangeText={(text) => setActorSeleccionado({ ...actorSeleccionado, nacionalidad: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Nacimiento"
              value={actorSeleccionado?.fechaNacimiento || ''}
              onChangeText={(text) => setActorSeleccionado({ ...actorSeleccionado, fechaNacimiento: text })}
            />
            <PrimaryButton
              label='Guardar'
              onPress={guardarActor}
              onLongPress={guardarActor}
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
