import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { OPEN_WEATHER_API_KEY } from 'react-native-dotenv';
import api from './services/api';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('curitiba');
  const [current, setCurrent] = useState(undefined);

  const callApi = async () => {
    if (!city) return;
    try {
      const { data } = await api.get('/find', {
        params: {
          q: city,
          appid: OPEN_WEATHER_API_KEY,
        },
      });

      if (!data.list.length) throw new Error('City not found');

      const [
        {
          coord: { lat, lon },
        },
      ] = data.list;

      const {
        data: {
          current: {
            sunrise,
            sunset,
            feels_like,
            weather: { icon },
          },
        },
      } = await api.get('/onecall', {
        params: {
          lat,
          lon,
          appid: OPEN_WEATHER_API_KEY,
        },
      });

      setCurrent({
        sunrise,
        sunset,
        feels_like,
        icon,
      });
    } catch (error) {
      Alert.alert('An error occurred', error.message, [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.cityNameInput}
          placeholder="Digite o nome de uma cidade"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Ok" style={styles.confirmButton} onPress={callApi} />
      </View>
      <Text>{current ? JSON.stringify(current) : 'a'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  cityNameInput: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9,
  },
  confirmButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
