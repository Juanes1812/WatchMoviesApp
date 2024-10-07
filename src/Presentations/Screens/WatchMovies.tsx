import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Button, Text, Image, View, Dimensions, ScrollView } from 'react-native';


export const WatchMovies = () => {
    return (
        <View style={style.container}>
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
                        <Image
                            source={require('../../../assets/images/lamaldiciondehillhouse.jpg')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/dexter.jpg')}
                            style={style.imagenSerie}

                        />
                        <Image
                            source={require('../../../assets/images/lamaldiciondeblymanor.jpg')}
                            style={style.imagenSerie}

                        />
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
})

