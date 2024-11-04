import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, Image, View, Modal, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';


export default function FoodImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = () => {
    setLoading(true);
    fetch('https://foodish-api.com/api/')
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.image);
        setLoading(false); 
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
        <Text>Decíde que puedes comer mientras ves la película</Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text>Error al cargar la imagen.</Text>
        )}
        <Button
          title="Recargar imagen"
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
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});
