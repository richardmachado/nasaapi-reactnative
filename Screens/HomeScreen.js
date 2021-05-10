import React from "react";
import { View, Button, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 375, height: 325 }}
        source={{
          uri: "https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.jpg",
        }}
      />
      <View style={{ marginBottom: 30, marginTop: 20 }}>
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
