import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { PrimaryButton } from '../Componentes';


export const WatchMovies = ({ codigoUsuario }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [datosFiltrados, setDatosFiltrados] = useState(null);
    const [datos, setDatos] = useState([]);
    const [datosListaSeries, setdatosListaSeries] = useState([]);

    console.log('Este es el codigo Usuario' + codigoUsuario); // prueba de que el codigoUsuario fué bien exportado


    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('serie')
                .select(`
              id, 
              titulo, 
              imagen_url, 
              descripcion, 
              fechaEstreno, 
              puntaje,
              plataforma (nombre), 
              director (nombre, apellido), 
              serie_actor (actor (nombre, apellido)), 
              serie_idioma (idioma (nombre))`
                );

            if (error) {
                console.error('Error al obtener datos:', error);
            } else {
                setDatos(data); // Guardar los datos en el estado
                console.log('Datos para la Daots' + data);
            }
            setLoading(false);

        } catch (error) {
            console.error('Error inesperado, nosequees:', error);
        }
    };

    const fetchFilteredData = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('listaSeries')
            .select(`idListaSeries,
          id_usuario,
          serie (
            id, 
            titulo, 
            imagen_url, 
            descripcion, 
            fechaEstreno, 
            puntaje,
            plataforma (nombre), 
            director (nombre, apellido),
            serie_actor (actor (nombre, apellido)),
            serie_idioma (idioma (nombre))
          )`)
            .eq('id_usuario', codigoUsuario);

        if (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
            return;
        }

        setdatosListaSeries(data);
        setLoading(false);
        console.log('Datos de datosListaSeries:', JSON.stringify(data, null, 2));
    };


    useEffect(() => {
        fetchData();
        fetchFilteredData();
    }, []);


    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await supabase
                .from('serie')
                .select('id,imagen_url');

            if (error) {
                console.error(error);
            } else {
                setImages(data);
                console.log(data)
            }
            setLoading(false);
        };

        fetchImages();
    }, []);


    // Eliminar listaSeries
  const deleteListaSeries = async (idListaSeries) => {
    const { error } = await supabase
      .from('listaSeries')
      .delete()
      .eq('idListaSeries', idListaSeries);

    if (error) {
      console.error('Error al eliminar listaSerie:', error);
    } else {
      setdatosListaSeries(datosListaSeries.filter((listaSerie) => listaSerie.idListaSeries !== idListaSeries));
    }
  };





    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }


    const abrirModal = (id_seleccionado) => {
        const filtro = datos.find(item => item.id === id_seleccionado);
        setDatosFiltrados(filtro);
        setModalVisible(true);
    };
    const cerrarModal = () => {
        setModalVisible(false);
    };





    


    return (
        <View style={style.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cerrarModal}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContenido}>
                        {datosFiltrados ? (
                            <View style={style.itemContainer}>
                                <View style={style.itemContainerTitle}>
                                    <Text style={style.itemTitle}>{datosFiltrados.titulo}</Text>
                                </View>
                                <View style={style.rowModal}>
                                    <View style={style.imagenSerie}>
                                        <Image
                                            source={{ uri: datosFiltrados.imagen_url }}
                                            style={style.imagenSerie}
                                        />
                                    </View>
                                    <View style={style.itemContainerPuntaje}>
                                        <Text style={style.itemTextoPuntaje}>{datosFiltrados.puntaje}</Text>
                                    </View>
                                </View>
                                <Text style={style.itemTextoDescripcion}>{datosFiltrados.descripcion}</Text>
                                <Text>Director: {datosFiltrados.director.nombre} {datosFiltrados.director.apellido}</Text>
                                <Text style={style.actorNombre}>Actores: {datosFiltrados.serie_actor
                                    .map((actorItem) => `${actorItem.actor.nombre} ${actorItem.actor.apellido}`)
                                    .join(', ')}
                                </Text>
                                <Text>Fecha de Estreno: {datosFiltrados.fechaEstreno}</Text>
                                <Text>Plataforma: {datosFiltrados.plataforma.nombre}</Text>
                                <Text style={style.idiomaNombre}>Idiomas: {datosFiltrados.serie_idioma
                                    .map((idiomaItem) => idiomaItem.idioma.nombre)
                                    .join(', ')}
                                </Text>
                            </View>
                        ) : (
                            <Text>No se encontraron datos.</Text>
                        )}
                        <View style={style.rowSeries}>
                        <PrimaryButton
                            label='Cancelar'
                            onPress={cerrarModal}
                            onLongPress={cerrarModal}
                        />
                    
                        </View>
                    </View>
                </View>
            </Modal>















            <ScrollView>
                <View style={style.sectionTitle}>
                    <Text style={style.mainTitle}>
                        WhatchMovies
                    </Text>
                    <Text style={style.mainSubtitle}>
                        Series y Peliculas
                    </Text>
                </View>

                <View style={style.sectionGenre}>
                    <View>
                        <Text style={style.titleGenre}>
                            Lista de Favoritos
                        </Text>
                    </View>

                    <View style={style.rowSeries}>
                        {datosListaSeries.length > 0 ? (
                            datosListaSeries.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => abrirModal(item.serie.id)}>
                                    <View>
                                        <Image
                                            source={{ uri: item.serie.imagen_url }}
                                            style={style.imagenSerie}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>Cargando series...</Text>
                        )}

                    </View>


                </View>


                <View style={style.sectionGenre}> {/* Div para contener el titulo y las imagenes de seccion 1*/}
                    <View>
                        <Text style={style.titleGenre}> {/*Titulo de seccion*/}
                            Terror
                        </Text>
                    </View>

                    <View style={style.rowSeries}>

                        <TouchableOpacity onPress={() => abrirModal(1)}>
                            <View>
                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg' }}
                                    style={style.imagenSerie}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(2)}>
                            <View>

                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/kill_bill_volume_1-216872360-large.jpg' }}
                                    style={style.imagenSerie}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(3)}>
                            <View>

                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/django_unchained-956246347-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>


                    </View>
                </View>

                <View style={style.sectionGenre}> {/* Div para contener el titulo y las imagenes de seccion 2*/}
                    <View>
                        <Text style={style.titleGenre}> {/*Titulo de seccion*/}
                            Ciencia Ficción
                        </Text>
                    </View>

                    <View style={style.rowSeries}>
                        <TouchableOpacity onPress={() => abrirModal(4)}>
                            <View>

                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/the_dark_knight-102763119-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => abrirModal(5)}>
                            <View>

                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/inception-652954101-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(6)}>
                            <View>

                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/interstellar-366875261-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.sectionGenre}> {/* Div para contener el titulo y las imagenes de seccion 1*/}
                    <View>
                        <Text style={style.titleGenre}> {/*Titulo de seccion*/}
                            Drama
                        </Text>
                    </View>
                    <View style={style.rowSeries}>
                        <TouchableOpacity onPress={() => abrirModal(7)}>
                            <View>
                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/jurassic_park-187298880-large.jpg' }}
                                    style={style.imagenSerie}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(8)}>
                            <View>
                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/jaws-195807307-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(9)}>
                            <View>
                                <Image
                                    source={{ uri: 'https://pics.filmaffinity.com/schindler_s_list-473662617-large.jpg' }}
                                    style={style.imagenSerie}
                                />

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.sectionGenre}> {/* Div para contener el titulo y las imagenes de seccion 1*/}
                    <View>
                        <Text style={style.titleGenre}> {/*Titulo de seccion*/}
                            Romance
                        </Text>
                    </View>

                    <View style={style.rowSeries}>
                        <Image
                            source={require('../../../assets/images/peakyblinders.png')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/gameofthrones.jpg')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/strangerthings.jpg')}
                            style={style.imagenSerie}

                        />
                    </View>
                </View>


            </ScrollView>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#354f5f',
        alignItems: 'center',

    },
    imagenSerie: {
        width: 120,
        height: 180,
        resizeMode: 'stretch',  // Ajusta la imagen al tamaño especificado
        marginHorizontal: 4,
        borderRadius: 5,
        shadowColor: '#000',         // Color de la sombra en negro
        shadowOffset: { width: 6, height: 4 }, // Desplazamiento mínimo
        shadowOpacity: 0.3,          // Aumentar la opacidad para que sea más visible
        shadowRadius: 3,             // Radio bajo para un borde suave
    },


    rowSeries: {
        flexDirection: 'row',
    },
    rowModal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionGenre: {
        height: 'auto',
        marginVertical: 4,
        marginLeft: 5,
    },
    titleGenre: {
        color: 'white',
        marginBottom: 2,
        fontWeight: 'bold',
        fontSize: 15,
    },
    mainTitle: {
        color: '#e9ff11',
        fontFamily: 'Sans-serif',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    mainSubtitle: {
        color: '#e9ff11',
        fontFamily: 'Sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    sectionTitle: {
        marginVertical: 10,
        justifyContent: "center",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContenido: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    textoModal: {
        marginBottom: 15,
        fontSize: 18,
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Sans-serif',

    },
    itemContainerTitle: {
        alignItems: 'center',
    },
    actorNombre: {

    },
    idiomaNombre: {

    },
    itemTextoPuntaje: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Sans-serif',
    },
    itemContainerPuntaje: {
        width: 100,
        height: 100,
        marginLeft: 20,
        backgroundColor: '#FFD700', //Dorado color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: '#000', // Sombra sutil para darle profundidad
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
    },

    itemTextoDescripcion: {
        textAlign: 'justify',
    },
})

