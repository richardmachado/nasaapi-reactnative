import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

const KEY = "";

export default function POTD() {
  const [potd, setPotd] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${KEY}`)

      .then((res) => {
        console.log(res.data);
        setPotd(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!potd)
    return (
      <View style={styles.loadingscreen}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );

  return (
    <ScrollView>
      <View style={styles.page}>
        <Text style={styles.date}>{potd.date}</Text>
        <Image
          source={{
            uri: `${potd.url}`,
          }}
          style={styles.photo}
        />
        <Text style={styles.explanation}>{potd.explanation}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },

  photo: {
    height: 375,
    width: 375,
    marginBottom: 25,
  },
  explanation: {
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 4,
    padding: 20,
    fontSize: 15,
    backgroundColor: "black",
    color: "white",
  },

  date: {
    fontSize: 25,
  },
  loadingscreen: {
    backgroundColor: "black",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    color: "white",
    fontSize: 44,
  },
});
