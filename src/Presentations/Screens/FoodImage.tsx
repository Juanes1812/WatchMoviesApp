import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Linking, ActivityIndicator, TouchableOpacity, FlatList, ScrollView, ScrollViewComponent } from 'react-native';


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
        setImageCategory(data.image.split('images/')[1].split('/')[0]);
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
    <View style={style.container}>
      <ScrollView>
        <View style={style.sectionTitle}>
          <Text style={style.mainTitle}>¿No sabes que comer mientras ves la película?</Text>
          <Text style={style.mainSubtitle}>Nosotros la elegimos por tí:</Text>
        </View>
        <View style={style.imageContainer}>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : imageUrl ? (
            <Image source={{ uri: imageUrl }} style={style.image} />
          ) : (
            <Text>Error al cargar la imagen.</Text>
          )}

          <Text style={style.categoryText}>La comida elegida para tí es: {imageCategory}</Text>


          <TouchableOpacity style={style.button} onPress={() => {
            setLoading(true);
            fetchImage();
          }}>
            <Text style={style.buttonText}>Elegir comida de forma aleatoria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              Linking.openURL('https://www.google.com/search?q=¿Cómo hacer ' + imageCategory + '?&tbm=vid');
            }}
          >
            <Text style={style.buttonText}>¿Cómo puedo prepararlo?</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>


    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#354f5f',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  imageContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',

  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,

  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    resizeMode: 'cover',
  },
  mainTitle: {
    color: '#e9ff11',
    fontFamily: 'Sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 13,
    textAlign: 'center',

  },
  mainSubtitle: {
    color: '#e9ff11',
    fontFamily: 'Sans-serif',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 13,
    textAlign: 'center',

  },
  sectionTitle: {
    marginVertical: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  
});
