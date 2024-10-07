import React, { useState } from 'react';
import { _View, Pressable, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from '../Componentes';




export const Contador = () => {
    const [Contador, setContador] = useState(10);
    let [Operacion, setOperacion] = useState(" ");

    const calcularResultado = () => {
        try {
            const resultado = eval(Operacion).toFixed(2); // La operación la pasa a operacion y arroja el resultado
            setOperacion(resultado.toString()); // Me ayuda a convertir el resultado en String
            console.log(resultado);
        } catch (error) {
            console.error("Error en la operación:", error);
            setOperacion("Error");
        }
    };

    const ResetResultado = () => {
        setOperacion(' ');
    };

    return (
        <View>


            <View style={style.container}>
                <View style={style.table}>

                    <View style={style.row}>

                        <View style={style.cellResult}>
                            <Text style={style.titulo}>
                                {Operacion}
                            </Text>
                        </View>
                    </View>

                    <View style={style.row}>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='%'
                                onPress={() => setOperacion(Operacion + '%')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='1'
                                onPress={() => setOperacion(Operacion + '1')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='2'
                                onPress={() => setOperacion(Operacion + '2')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='3'
                                onPress={() => setOperacion(Operacion + '3')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='+'
                                onPress={() => setOperacion(Operacion + '+')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                    </View>

                    <View style={style.row}>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='^'
                                onPress={() => setOperacion(Operacion + '**')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='4'
                                onPress={() => setOperacion(Operacion + '4')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='5'
                                onPress={() => setOperacion(Operacion + '5')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='6'
                                onPress={() => setOperacion(Operacion + '6')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='-'
                                onPress={() => setOperacion(Operacion + '-')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                    </View>

                    <View style={style.row}>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='('
                                onPress={() => setOperacion(Operacion + '(')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='7'
                                onPress={() => setOperacion(Operacion + '7')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='8'
                                onPress={() => setOperacion(Operacion + '8')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='9'
                                onPress={() => setOperacion(Operacion + '9')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='x'
                                onPress={() => setOperacion(Operacion + '*')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                    </View>

                    <View style={style.row}>
                        <View style={style.cell}>
                            <PrimaryButton
                                label=')'
                                onPress={() => setOperacion(Operacion + ')')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='0'
                                onPress={() => setOperacion(Operacion + '0')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='.'
                                onPress={() => setOperacion(Operacion + '.')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='='
                                onPress={calcularResultado}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                        <View style={style.cell}>
                            <PrimaryButton
                                label='÷'
                                onPress={() => setOperacion(Operacion + '/')}
                                onLongPress={() => ResetResultado()}
                            />
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}


const style = StyleSheet.create({
    titulo: {
        fontSize: 60,
        textAlign: 'right',
        color: '#fff', // Color blanco casilla de operación
        fontWeight: '600',
        paddingRight: 10,
        paddingBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2c2c', // Fondo gris claro fuera de calculadora
        padding: 20,
        borderRadius: 20,
    },
    table: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#2c2c2c', // Fondo oscuro de la calculadora
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#3a3a3a', // Color de borde entre celdas
        backgroundColor: '#4a4a4a', // Fondo de botones

    },
    cellResult: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a', // Fondo oscuro para el display
        minHeight: 120, // Altura mínima del display
    },
    cellText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})