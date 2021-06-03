import React from "react";
import { View, Button, Image, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.body}>
      <Image
        style={styles.nasaphoto}
        source={{
          uri: "https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.jpg",
        }}
      />
      <View style={styles.buttons}>
        <Button
          title="Rovers Home Screen"
          onPress={() => navigation.navigate("RoversHomeScreen")}
        />
      </View>
      <View>
        <Button
          title="Photo of the Day"
          onPress={() => navigation.navigate("POTD")}
        />
      </View>
      <View>
        <Button
          title="Near Earth Objects"
          onPress={() => navigation.navigate("NEO")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nasaphoto: {
    width: 375,
    height: 325,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginBottom: 30,
    marginTop: 20,
  },
});
