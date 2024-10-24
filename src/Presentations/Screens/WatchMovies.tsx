import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../services/supabaseClient';


export const WatchMovies = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [datos, setDatos] = useState({});


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
              serie_actor (actor (nombre)), 
              serie_idioma (idioma (nombre))`
                ).eq('id', 1);

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

    // Filtra la imagen con id 1
    const imagenPelicula1 = images.find(image => image.id === 1);
    const imagenPelicula2 = images.find(image => image.id === 2);
    const imagenPelicula3 = images.find(image => image.id === 3);
    const imagenPelicula4 = images.find(image => image.id === 4);
    const imagenPelicula5 = images.find(image => image.id === 5);
    const imagenPelicula6 = images.find(image => image.id === 6);
    const imagenPelicula7 = images.find(image => image.id === 7);
    const imagenPelicula8 = images.find(image => image.id === 8);
    const imagenPelicula9 = images.find(image => image.id === 9);
    const imagenPelicula10 = images.find(image => image.id === 10);
    const imagenPelicula11 = images.find(image => image.id === 11);
    const imagenPelicula12 = images.find(image => image.id === 12);

    const abrirModal = (id) => {
        const datosFiltrados = datos.find(item => item.id === ID_imagen_serie);
        setSelectedMovieId(id);
        setModalVisible(true);
    };
    const cerrarModal = () => {
        setModalVisible(false);
    };
    const datosFiltrados = datos.find(item => item.id === ID_imagen_serie);

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
                        <FlatList
                            data={datos}
                            keyExtractor={(item) => item.id.toString()} // Usa el ID de la serie como clave
                            renderItem={({ item }) => (
                                <View style={style.itemContainer}>
                                    <View>
                                            <Image
                                                source={{ uri: item.imagen_url }}
                                                style={style.imagenSerie}
                                            />

                                    </View>
                                    <Text style={style.title}>Título: {item.titulo}</Text>
                                    <Text>Plataforma: {item.plataforma.nombre}</Text>
                                    <Text>Director: {item.director.nombre}</Text>

                                    {/* Mostrar todos los actores asociados con la serie */}
                                    <Text>Actores:</Text>
                                    {item.serie_actor.map((actorItem, index) => (
                                        <Text key={index} style={style.actorNombre}>
                                            - {actorItem.actor.nombre}
                                        </Text>
                                    ))}

                                    {/* Mostrar todos los idiomas asociados con la serie */}
                                    <Text>Idiomas:</Text>
                                    {item.serie_idioma.map((idiomaItem, index) => (
                                        <Text key={index} style={style.idiomaNombre}>
                                            - {idiomaItem.idioma.nombre}
                                        </Text>
                                    ))}

                                    <Text>Descripción: {item.descripcion}</Text>
                                    <Text>Fecha de Estreno: {item.fechaEstreno}</Text>
                                    <Text>Puntaje: {item.puntaje}</Text>
                                </View>
                            )}
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
                                {imagenPelicula1 && (
                                    <Image
                                        source={{ uri: 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg' }}
                                        style={style.imagenSerie}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(2)}>
                            <View>
                                {imagenPelicula2 && (
                                    <Image
                                        source={{ uri: imagenPelicula2.imagen_url }}
                                        style={style.imagenSerie}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirModal(3)}>
                            <View>
                                {imagenPelicula3 && (
                                    <Image
                                        source={{ uri: imagenPelicula3.imagen_url }}
                                        style={style.imagenSerie}
                                    />
                                )}
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
                        <Image
                            source={require('../../../assets/images/breakingbad.jpg')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/avatar.jpg')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/theoffice.jpg')}
                            style={style.imagenSerie}

                        />
                    </View>
                </View>

                <View style={style.sectionGenre}> {/* Div para contener el titulo y las imagenes de seccion 1*/}
                    <View>
                        <Text style={style.titleGenre}> {/*Titulo de seccion*/}
                            Drama
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
        width: 300,
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

