import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';


export default function FoodImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageCategory, setImageCategory] = useState(null);

  const fetchImage = () => {
    setLoading(true);
    fetch('https://foodish-api.com/api/')
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.image);
        setLoading(false); 
        setImageCategory ( data.image.split('images/')[1].split('/')[0]);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchImage(); 
  }, []);

  

  return (
    <View style={styles.container}>
      <View>
        <Text>¿No sabes que pedir a domicilio mientras ves la película?</Text>
        <Text>Elíge aleatoriamente:</Text>
      </View>
      <View>
        <Text>La comida elegida para tí es: {imageCategory}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text>Error al cargar la imagen.</Text>
        )}
        <Button
          title="Elegir comida de forma aleatoria"
          onPress={() => {
            setLoading(true);
            fetchImage(); 
          }} 
          />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#354f5f',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});
