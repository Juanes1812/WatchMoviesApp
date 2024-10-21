import React, { useState, useEffect } from 'react'
import { Component } from 'react';
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';


export const WatchMovies = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [informacion, setInformacion] = useState({});

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
        const pelicula = datos.find(item => item.id === id);
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
                        <Text style={style.textoModal}>¡Este es un Modal!</Text>
                        <Button title="Cerrar" onPress={cerrarModal} />
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
                                        source={{ uri: imagenPelicula1.imagen_url }}
                                        style={style.imagenSerie}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        <View>
                            {imagenPelicula2 && (
                                <Image
                                    source={{ uri: imagenPelicula2.imagen_url }}
                                    style={style.imagenSerie}
                                />
                            )}
                        </View>
                        <View>
                            {imagenPelicula3 && (
                                <Image
                                    source={{ uri: imagenPelicula3.imagen_url }}
                                    style={style.imagenSerie}
                                />
                            )}
                        </View>



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
})

