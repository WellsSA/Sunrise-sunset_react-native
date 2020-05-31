import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OPEN_WEATHER_API_KEY } from 'react-native-dotenv';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app! {OPEN_WEATHER_API_KEY}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
