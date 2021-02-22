import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Curiosity from "./Rovers/Curiosity";

export default function App() {


  return (
    <View style={styles.container}>
      <Text style={styles.header}>NASA APIs!</Text>
      <Curiosity />
      <StatusBar style="auto" />
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
  header: {
    fontSize:24,
  }
});
