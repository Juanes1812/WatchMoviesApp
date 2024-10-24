import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { PrimaryButton } from '../Componentes';


export const WatchMovies = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [datosFiltrados, setDatosFiltrados] = useState(null);
    const [datos, setDatos] = useState([]);


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
              director (nombre), 
              serie_actor (actor (nombre, apellido)), 
              serie_idioma (idioma (nombre))`
                );

            if (error) {
                console.error('Error al obtener datos:', error);
            } else {
                setDatos(data); // Guardar los datos en el estado
            }
            setLoading(false);

        } catch (error) {
            console.error('Error inesperado, nosequees:', error);
        }
    };

    useEffect(() => {
        fetchData();
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
                        {/* Comprobar si se encontraron datos filtrados */}
                        {datosFiltrados ? (
                            <View style={style.itemContainer}>
                                <Image
                                    source={{ uri: datosFiltrados.imagen_url }}
                                    style={style.imagenSerie}
                                />
                                <Text style={style.title}>Título: {datosFiltrados.titulo}</Text>
                                <Text>Plataforma: {datosFiltrados.plataforma.nombre}</Text>
                                <Text>Director: {datosFiltrados.director.nombre}</Text>

                                {/* Mostrar todos los actores asociados con la serie */}
                                <Text>Actores:</Text>
                                {datosFiltrados.serie_actor.map((actorItem, index) => (
                                    <Text key={index} style={style.actorNombre}>
                                        - {actorItem.actor.nombre} {actorItem.actor.apellido}
                                    </Text>
                                ))}

                                {/* Mostrar todos los idiomas asociados con la serie */}
                                <Text>Idiomas:</Text>
                                {datosFiltrados.serie_idioma.map((idiomaItem, index) => (
                                    <Text key={index} style={style.idiomaNombre}>
                                        - {idiomaItem.idioma.nombre}
                                    </Text>
                                ))}

                                <Text>Descripción: {datosFiltrados.descripcion}</Text>
                                <Text>Fecha de Estreno: {datosFiltrados.fechaEstreno}</Text>
                                <Text>Puntaje: {datosFiltrados.puntaje}</Text>
                            </View>
                        ) : (
                            <Text>No se encontraron datos.</Text>
                        )}
                        <PrimaryButton
                            label='Cancelar'
                            onPress={cerrarModal}
                            onLongPress={cerrarModal}
                        />
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={style.sectionTitle}>  {/* Div para el titulo*/}
                    <Text style={style.mainTitle}>
                        WhatchMovies
                    </Text>
                    <Text style={style.mainSubtitle}>
                        Series y Peliculas
                    </Text>
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
        resizeMode: 'stretch',  /*contain, cover, stretch, center*/
        marginHorizontal: 4,
        borderRadius: 5,
    },
    rowSeries: {
        flexDirection: 'row',
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actorNombre: {
        fontSize: 16,
    },
    idiomaNombre: {
        fontSize: 16,
    },
})

